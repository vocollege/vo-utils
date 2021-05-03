// type VoConfigRoutesType = {
//     [key: string]: any,
// }
type VoConfigType = {
  [key: string]: any;
};

class VoConfig {
  // routes: VoConfigRoutesType = {};
  // getRoutes() {
  //     return this.routes;
  // }
  // setRoutes(routes: VoConfigRoutesType) {
  //     this.routes = routes;
  // }

  config: VoConfigType = {
    API_BASE_URL: "",
    API_ENDPOINT: "",
    API_GRAPHQL: "",

    AUTH_CLIENT_ID: "",
    AUTH_BASE_URL: "",
    AUTH_ENDPOINT: "",

    DOCS_BASE_URL: "",
    DOCS_ENDPOINT: "",
    DOCS_GRAPHQL: "",

    BASE_URL: "",
    AUTH: "",
    LOGIN: "",
    HOME: "",
    HOME_AUTHENTICATED: "",

    AUTH_STORAGE_STATE: "voapp_state",
    AUTH_STORAGE_VERIFIER: "voapp_verifier",
    AUTH_STORAGE_REFRESH_TOKEN: "voapp_refreshtoken",
    AUTH_STORAGE_ACCESS_TOKEN: "voapp_accesstoken",
    AUTH_STORAGE_TOKEN_TYPE: "voapp_tokentype",
    AUTH_STORAGE_EXPIRES_IN: "voapp_expiresin",
  };

  setConfig(config: VoConfigType) {
    this.config = { ...this.config, ...config };
  }

  get get() {
    return this.config;
  }
}

export default new VoConfig();
