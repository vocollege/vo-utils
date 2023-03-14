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
// import VoAuth from "../VoAuth";
import VoConfig from "../VoConfig";
import { GeneralObject } from "../../global";
import { localStorage } from "../VoHelpers";

class VoApi extends VoBase {
  graphqlClient: any;
  graphqlSubscriptionClient: any;

  init(params: GeneralObject = {}) {
    this.graphqlClient = GraphClient.createGraphClient(
      this.getGraphqlUrl,
      false,
      params
    );
  }

  // initSubscriptions() {
  //   this.graphqlSubscriptionClient = GraphClient.createGraphSubscriptionClient(
  //     this.getGraphqlSubscriptionUrl
  //   );
  // }

  get getGraphqlUrl() {
    return VoConfig.get.API_BASE_URL + "" + VoConfig.get.API_GRAPHQL;
  }

  get getGraphqlSubscriptionUrl() {
    return (
      VoConfig.get.API_SUBSCRIPTIONS_BASE_URL +
      "" +
      VoConfig.get.API_GRAPHQL_SUBSCRIPTIONS
    );
  }

  async getUser() {
    try {
      let url = this.getUrl + "/user";
      let masquerade: any = localStorage.get(VoConfig.get.MASQUERADE_USER);
      if (masquerade) {
        masquerade = JSON.parse(masquerade);
        url = `${url}?masquerade=${masquerade?.id}`;
      }
      const user = await axios.get(url);
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
