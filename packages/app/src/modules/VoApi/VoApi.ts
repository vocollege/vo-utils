// Vendors.
import axios from 'axios';
import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    Observable,
    from
  } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Custom.
import GraphClient from './GraphClient';
import VoBase from '../VoBase';
import VoAuth from '../VoAuth';
import VoConfig from '../VoConfig';


class VoApi extends VoBase {

    graphqlClient: any

    init() {
        this.graphqlClient = GraphClient.createGraphClient(this.getGraphqlUrl, VoAuth.getToken, VoAuth.refreshToken);
    }

    get getGraphqlUrl() {
        return VoConfig.get.API_BASE_URL + '' + VoConfig.get.API_GRAPHQL;
    }

    async getUser() {
        try {
            const user = await axios.get(this.getUrl + '/user');
            return user;
        } catch(error) {
            throw error;
        }
    }

    async logout() {
        try {
            const url = this.getUrl + '/logout';

            // "withCredentials" is required in order to clear the backend session,
            // present in a HTTP-only cookie.
            await axios.get(url);

            return true;

        } catch(error) {
            throw error;
        }
    }

    // async authorize(params: object) {
    //     try {
    //         const url = this.getUrl + '/token';
    //         const response = await axios.post(url, params);
    //         return response.data;
    //     } catch(error) {
    //         throw error;
    //     }

    // }

    async getTemporaryFileUrl(id: string) {
        try {
            const url = `${this.getUrl}/docs/files/${id}`;
            return axios.get(url);
        } catch(error) {
            throw error;
        }
    }

    async downloadFile(id: string) {
        try {

            let elId = `file-${id}`;

            // Ensure that an old element is not left in the DOM.
            let el = document.getElementById(elId);
            if (el !== null && el.parentNode) {
                el.parentNode.removeChild(el);
            }

            // Retrieve the temporary download URL.
            let fileUrl = await this.getTemporaryFileUrl(id);
            if (fileUrl.data) {
                let anchor = document.createElement('a');
                anchor.id = elId;
                anchor.href = fileUrl.data;
                anchor.download = fileUrl.data;
                document.body.appendChild(anchor);
                anchor.click();
                setTimeout(() => {
                    if (anchor.parentNode) {
                        anchor.parentNode.removeChild(anchor);
                    }
                }, 500);
            } else {
                throw "No file was found";
            }
        } catch (error) {
            throw error;
        }
    }

}

export default new VoApi('api');
