import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
  from,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// @ts-ignore
import { createUploadLink } from "apollo-upload-client";
import VoAuth from "../VoAuth";
import VoRouter from "../VoRouter";
import VoGroups from "../VoGroups";
import VoConfig from "../VoConfig";
import { localStorage } from "../VoHelpers";
import { GeneralObject } from "../../global";

async function redirect() {
  await VoAuth.logout();
  VoRouter.redirectToLogout();
}

class GraphClient {
  static createGraphClient(
    url: string,
    uploadLink = false,
    params: GeneralObject = {}
  ) {
    let httpLink;

    if (!uploadLink) {
      // Create a httpLink to send GraphQL operations over HTTP.
      httpLink = new HttpLink({ uri: url });
    } else {
      // Create a Apollo Link capable of file uploads.
      httpLink = createUploadLink({ uri: url });
    }

    // const wsLink = new WebSocketLink({
    //   uri: wsUrl,
    //   options: {
    //     reconnect: true,
    //   },
    //   // webSocketImpl: ws,
    // });

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    // const splitLink = split(
    //   ({ query }) => {
    //     const definition = getMainDefinition(query);
    //     return (
    //       definition.kind === "OperationDefinition" &&
    //       definition.operation === "subscription"
    //     );
    //   },
    //   wsLink,
    //   httpLink
    // );

    // Get other Apollo Links.
    // const links = this.getGraphClientLinks(getToken, refreshToken);
    const links = this.getGraphClientLinks(params);

    return new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          Education: {
            keyFields: (object, context) => {
              if (!object.hasOwnProperty("pivot")) {
                return ["id"];
              }
              return [
                "id",
                "pivot",
                ["education_usage_id", "education_usage_type", "field"],
              ];
            },
          },
          //   PivotEducation: {
          //     // keyFields: ["education_usage_id"],
          //     keyFields: [
          //       "education_id",
          //       "education_usage_id",
          //       "education_usage_type",
          //       "field",
          //     ],
          //   },

          ValidigGeneralSurveyRow: {
            fields: {
              options: {
                read(existing) {
                  return existing ? JSON.parse(existing) : existing;
                },
                // merge(existing = "", incoming: "") {
                //   console.log("existing", existing);
                //   console.log("incoming", incoming);

                //   // return [...existing, ...incoming];
                //   return incoming;
                // },
              },
            },
          },
        },
      }),
      link: from([
        links.errorLink,
        links.authLink,
        links.omitTypenameLink,
        links.transformVariablesLink,
        httpLink,
      ]),
    });
  }

  static getGraphClientLinks(params: GeneralObject = {}) {
    // Create an errorLink to handle errors, e.g. when the token has expired
    // and has to be renewed. This works as an interceptor for GraphQL calls.
    const errorLink = onError(
      ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors)
          for (let err of graphQLErrors) {
            switch (err.message) {
              case "Unauthenticated.":
                return new Observable((observer) => {
                  VoAuth.refreshToken()
                    .then((token: any) => {
                      const oldHeaders = operation.getContext().headers;
                      operation.setContext({
                        headers: {
                          ...oldHeaders,
                          Authorization: token
                            ? `${token.token_type} ${token.access_token}`
                            : "",
                        },
                      });
                      const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                      };
                      forward(operation).subscribe(subscriber);
                    })
                    .catch((error: any) => {
                      console.error(error);
                      redirect();
                    });
                });
            }
          }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);

          // @TODO Handle network error, e.g. through @apollo/client/link/retry

          // if ("statusCode" in networkError && networkError.statusCode === 403) {
          //   redirect();
          // }
        }
      }
    );

    // Create authLink that ensures that all calls include
    // the access token.
    const authLink = new ApolloLink((operation, forward) => {
      const token = params.token || VoAuth.getToken();
      const currentHeaders = operation.getContext().headers;
      let groupId = "";
      if (params.group) {
        groupId = params.group;
      } else {
        const currentGroup = VoGroups.getCurrent(true);
        groupId = currentGroup ? currentGroup.id : "";
      }

      let masquerade: any = localStorage.get(VoConfig.get.MASQUERADE_USER);

      if (masquerade) {
        masquerade = JSON.parse(masquerade);
      }

      operation.setContext(() => ({
        ...currentHeaders,
        headers: {
          Authorization: token
            ? // ? `${token.token_type} ${token.access_token}`
              `Bearer ${token.access_token}`
            : "",
          VoGroup: groupId,
          ...(masquerade && { VoMasquerade: masquerade?.id }),
        },
      }));
      return forward(operation);
    });

    const omitTypenameLink = new ApolloLink((operation, forward) => {
      if (operation.variables) {
        operation.variables = JSON.parse(
          JSON.stringify(operation.variables),
          (key, value) => (key === "__typename" ? undefined : value)
        );
      }
      return forward(operation);
    });

    const transformVariablesLink = new ApolloLink((operation, forward) => {
      const { operationName, variables } = operation;

      switch (operationName) {
        // Manipulate fields on GeneralSurvey.
        case "CreateGeneralSurvey":
        case "UpdateGeneralSurvey":
          Object.keys(variables.input)
            .filter((key: string) => Array.isArray(variables.input[key]))
            .map((key: string) => {
              // JSON stringify GeneralSurveyRow.options.
              variables.input[key]
                .filter((v: GeneralObject) => v?.options)
                .map((v: GeneralObject) => {
                  if (v.options) {
                    v.options = JSON.stringify(v.options);
                  }
                });
            });
          break;
      }

      // Traverse the variables and convert objects to JSON strings as needed
      // const transformVariables = (vars) => {
      //   if (!vars || typeof vars !== 'object') return vars;

      //   return Object.keys(vars).reduce((acc, key) => {
      //     const value = vars[key];

      //     // Check if the value is an object that needs conversion
      //     acc[key] = value && typeof value === 'object' && !(value instanceof Array)
      //       ? JSON.stringify(value)
      //       : value;

      //     return acc;
      //   }, {});
      // };

      // operation.variables = transformVariables(variables);

      return forward(operation);
    });

    return {
      errorLink,
      authLink,
      omitTypenameLink,
      transformVariablesLink,
    };
  }

  // static createGraphSubscriptionClient(url: string) {
  //   const wsLink = new WebSocketLink({
  //     uri: url,
  //     options: {
  //       reconnect: true,
  //     },
  //     // webSocketImpl: ws,
  //   });
  //   const links = this.getGraphClientLinks();
  //   return new ApolloClient({
  //     cache: new InMemoryCache(),
  //     link: from([links.errorLink, links.authLink, wsLink]),
  //   });
  // }
}

export default GraphClient;
