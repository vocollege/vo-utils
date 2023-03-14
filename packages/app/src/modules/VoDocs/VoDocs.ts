// Vendors.
import axios from "axios";

// Custom.
import GraphClient from "../VoApi/GraphClient";
import VoBase from "../VoBase";
// import VoAuth from '../VoAuth';
import VoConfig from "../VoConfig";
import VoGroups from "../VoGroups";

class VoDocs extends VoBase {
  graphqlClient: any;

  init() {
    this.graphqlClient = GraphClient.createGraphClient(
      this.getGraphqlUrl,
      true
    );
  }

  get getGraphqlUrl() {
    return VoConfig.get.DOCS_BASE_URL + "" + VoConfig.get.DOCS_GRAPHQL;
  }

  async getTemporaryFileUrl(id: string, publicDownload = false) {
    try {
      let currentGroup = VoGroups.getCurrent(true);
      axios.defaults.headers.common["VoGroup"] = currentGroup
        ? currentGroup.id
        : "";
      let endpoint = "download";
      if (publicDownload) {
        endpoint = "download-public";
      }
      const url = `${this.getUrl}/docs/${endpoint}/${id}`;
      return axios.get(url);
    } catch (error) {
      throw error;
    }
  }
}

export default new VoDocs("docs");
