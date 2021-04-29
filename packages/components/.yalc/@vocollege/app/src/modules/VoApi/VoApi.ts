// Vendors.
import axios from "axios";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Custom.
import GraphClient from "./GraphClient";
import VoBase from "../VoBase";
import VoAuth from "../VoAuth";
import VoConfig from "../VoConfig";

class VoApi extends VoBase {
  graphqlClient: any;

  init() {
    this.graphqlClient = GraphClient.createGraphClient(this.getGraphqlUrl);
  }

  get getGraphqlUrl() {
    return VoConfig.get.API_BASE_URL + "" + VoConfig.get.API_GRAPHQL;
  }

  async getUser() {
    try {
      const user = await axios.get(this.getUrl + "/user");
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const apiUrl = this.getUrl + "/logout";

      // "withCredentials" is required in order to clear the backend session,
      // present in a HTTP-only cookie.
      // @TODO But Laravel session logout doesn't seem to work on this call,
      // why we need to call VoRouter.redirectToLogout() afterwards.
      await axios.get(apiUrl);

      return true;
    } catch (error) {
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
}

export default new VoApi("api");
