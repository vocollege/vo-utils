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
    APP_VERSION: "",

    API_BASE_URL: "",
    API_ENDPOINT: "",
    API_GRAPHQL: "",
    API_SUBSCRIPTIONS_BASE_URL: "",
    API_GRAPHQL_SUBSCRIPTIONS: "",

    AUTH_CLIENT_ID: "",
    AUTH_BASE_URL: "",
    AUTH_ENDPOINT: "",

    ADMIN_BASE_URL: "",

    DOCS_BASE_URL: "",
    DOCS_ENDPOINT: "",
    DOCS_GRAPHQL: "",
    DOCS_PUBLIC_DISKS: "",
    DOCS_PRIVATE_DISKS: "",
    AWS_BUCKET_VOFRONT_FILES: "",
    AWS_BUCKET_VODOCS_FILES: "",

    BASE_URL: "",
    AUTH: "",
    LOGIN: "",
    HOME: "",
    HOME_AUTHENTICATED: "",

    AUTH_STORAGE_STATE: "vo_state",
    AUTH_STORAGE_VERIFIER: "vo_verifier",
    AUTH_STORAGE_REFRESH_TOKEN: "vo_rtoken",
    AUTH_STORAGE_ACCESS_TOKEN: "vo_atoken",
    // AUTH_STORAGE_TOKEN_TYPE: "voapp_tokentype",
    // AUTH_STORAGE_EXPIRES_IN: "voapp_expiresin",
    AUTH_DOMAIN: ".vo-college.se",

    CURRENT_GROUP: "vo_group",
    MASQUERADE_USER: "vo_masquerade",
  };

  setConfig(config: VoConfigType) {
    this.config = { ...this.config, ...config };
  }

  get get() {
    return this.config;
  }
}

export default new VoConfig();
