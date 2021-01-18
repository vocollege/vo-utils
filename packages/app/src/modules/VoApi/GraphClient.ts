import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    Observable,
    from
  } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

class GraphClient {

    static createGraphClient(url: string, getToken: any, refreshToken: any) {
        
        // Create a httpLink to send GraphQL operations over HTTP.
        const httpLink = new HttpLink({ uri: url });

        // Get other Apollo Links.
        const links = this.getGraphClientLinks(getToken, refreshToken);

        return new ApolloClient({
          cache: new InMemoryCache(),
          link: from([
            links.errorLink,
            links.authLink,
            httpLink
          ])
        });
        
    }

    static getGraphClientLinks(getToken: any, refreshToken: any) {


        // Create an errorLink to handle errors, e.g. when the token has expired
        // and has to be renewed. This works as an interceptor for GraphQL calls.
        const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors)
                for (let err of graphQLErrors) {
                    switch (err.message) {
                        case 'Unauthenticated.':
                            return new Observable((observer) => {
                                refreshToken().then((token: any) => {
                                    const oldHeaders = operation.getContext().headers;
                                    operation.setContext({
                                        headers: {
                                            ...oldHeaders,
                                            'Authorization': token ? `${token.token_type} ${token.access_token}` : "",
                                        }
                                    });
                                    const subscriber = {
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete: observer.complete.bind(observer)
                                    };            
                                    forward(operation).subscribe(subscriber);
                                });
                            });                
                    }
                }
            if (networkError) {

                console.log(`[Network error]: ${networkError}`);

                // @TODO Handle network error, e.g. through @apollo/client/link/retry
                
            };
        });

        // Create authLink that ensures that all calls include
        // the access token.
        const authLink = new ApolloLink((operation, forward) => {
            const token = getToken();
            const currentHeaders = operation.getContext().headers;
            operation.setContext(() => ({
                ...currentHeaders,
                headers: {
                    'Authorization': token ? `${token.token_type} ${token.access_token}` : ""
                }
            }));
          return forward(operation);
        });

        return {
            errorLink,
            authLink
        }
    }


}

export default GraphClient;