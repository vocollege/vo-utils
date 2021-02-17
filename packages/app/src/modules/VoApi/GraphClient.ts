import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    Observable,
    from
  } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from 'apollo-upload-client';

import VoAuth from '../VoAuth';

class GraphClient {

    static createGraphClient(url: string, uploadLink = false) {
        let httpLink;

        if (!uploadLink) {
            // Create a httpLink to send GraphQL operations over HTTP.
            httpLink = new HttpLink({ uri: url });
        }
        else {
            // Create a Apollo Link capable of file uploads.
            httpLink = createUploadLink({ uri: url });
        }

        // Get other Apollo Links.
        // const links = this.getGraphClientLinks(getToken, refreshToken);
        const links = this.getGraphClientLinks();

        return new ApolloClient({
          cache: new InMemoryCache(),
          link: from([
            links.errorLink,
            links.authLink,
            httpLink
          ])
        });
    }

    static getGraphClientLinks() {

        // Create an errorLink to handle errors, e.g. when the token has expired
        // and has to be renewed. This works as an interceptor for GraphQL calls.
        const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors)
                for (let err of graphQLErrors) {
                    switch (err.message) {
                        case 'Unauthenticated.':
                            return new Observable((observer) => {

                                    VoAuth.refreshToken().then((token: any) => {
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
            const token = VoAuth.getToken();
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