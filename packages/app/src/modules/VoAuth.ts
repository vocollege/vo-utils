import axios from "axios";
import crypto from "crypto-js";
import { Ability, AnyMongoAbility } from "@casl/ability";

import * as Helpers from "./VoHelpers";
import VoBase from "./VoBase";
import VoApi from "./VoApi";
import VoRouter from "./VoRouter";
import VoConfig from "./VoConfig";
import { VoTokenType } from "../global";
import VoGroups from "./VoGroups";
import JsCookies from "js-cookie";

class VoAuth extends VoBase {
  state: string;
  verifier: string;
  challenge: string;
  user: any = null;
  ability: AnyMongoAbility;
  globalAbility: AnyMongoAbility;

  constructor(key: string) {
    super(key);
    this.state = "";
    this.verifier = "";
    this.challenge = "";
    this.ability = new Ability();
    this.globalAbility = new Ability();
  }

  get getAppLoginUrl() {
    const url = this.getUrl + "/authorize";
    const { state, challenge } = this.initAuth();
    const params = {
      client_id: VoConfig.get.AUTH_CLIENT_ID,
      redirect_uri: this.getAuthUrl,
      response_type: "code",
      scope: "*",
      state: state,
      code_challenge: challenge,
      code_challenge_method: "S256",
    };
    return url + "?" + Helpers.encodeQueryData(params);
  }

  auth() {
    return new Promise(async (resolve, reject) => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const initiatedAuth = this.getInitiatedAuth();
      try {
        if (code && state && state === initiatedAuth.state) {
          let params = {
            grant_type: "authorization_code",
            client_id: VoConfig.get.AUTH_CLIENT_ID,
            redirect_uri: this.getAuthUrl,
            code_verifier: initiatedAuth.verifier,
            code,
          };
          const url = this.getUrl + "/token";
          const response = await axios.post(url, params);
          let state = VoConfig.get.AUTH_STORAGE_STATE || "";
          // Helpers.localStorage.remove(state);
          JsCookies.remove(state, {
            domain: VoConfig.get.AUTH_DOMAIN,
            sameSite: "Lax",
          });

          let verifier = VoConfig.get.AUTH_STORAGE_VERIFIER || "";
          // Helpers.localStorage.remove(verifier);
          JsCookies.remove(verifier, {
            domain: VoConfig.get.AUTH_DOMAIN,
            sameSite: "Lax",
          });

          this.setSession(response.data);
          await this.loadUser(true);
          resolve(true);
        } else {
          reject("Authorization failed");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  get getAuthUrl() {
    return VoConfig.get.BASE_URL + "" + VoConfig.get.AUTH;
  }

  logout() {
    return new Promise(async (resolve, reject) => {
      await VoApi.logout();
      this.resetSession();
      resolve(true);
    });
  }

  setSession(token: any, updateCookie = true) {
    // const { token_type, access_token, refresh_token, expires_in } = token;
    const { access_token, refresh_token } = token;

    if (updateCookie) {
      let refreshTokenKey = VoConfig.get.AUTH_STORAGE_REFRESH_TOKEN || "";
      JsCookies.set(refreshTokenKey, refresh_token, {
        expires: 21,
        sameSite: "Lax",
        domain: VoConfig.get.AUTH_DOMAIN,
      });

      let expires = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
      let accessTokenKey = VoConfig.get.AUTH_STORAGE_ACCESS_TOKEN || "";
      JsCookies.set(accessTokenKey, access_token, {
        expires,
        sameSite: "Lax",
        domain: VoConfig.get.AUTH_DOMAIN,
      });
    }

    axios.defaults.headers.common["Authorization"] =
      // token_type + " " + access_token;
      "Bearer " + access_token;
    let currentGroup = VoGroups.getCurrent(true);
    axios.defaults.headers.common["VoGroup"] = currentGroup
      ? currentGroup.id
      : "";
  }
  resetSession() {
    console.log("Resetting session");
    let refreshTokenKey = VoConfig.get.AUTH_STORAGE_REFRESH_TOKEN || "";
    Helpers.localStorage.remove(refreshTokenKey);
    JsCookies.remove(refreshTokenKey, {
      domain: VoConfig.get.AUTH_DOMAIN,
      sameSite: "Lax",
    });

    let accessTokenKey = VoConfig.get.AUTH_STORAGE_ACCESS_TOKEN || "";
    Helpers.localStorage.remove(accessTokenKey);
    JsCookies.remove(accessTokenKey, {
      domain: VoConfig.get.AUTH_DOMAIN,
      sameSite: "Lax",
    });

    Helpers.localStorage.remove(VoConfig.get.CURRENT_GROUP || "");
    Helpers.localStorage.remove(VoConfig.get.MASQUERADE_USER || "");
    Helpers.localStorage.remove(VoConfig.get.USER_LICENSEE || "");

    delete axios.defaults.headers.common["Authorization"];
  }
  async refreshToken() {
    try {
      const token: any = this.getToken();
      if (token?.refresh_token && token?.refresh_token !== "") {
        let params = {
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
          client_id: VoConfig.get.AUTH_CLIENT_ID,
          client_secret: "",
          scope: "",
        };
        const url = this.getUrl + "/token";
        const response = await axios.post(url, params);
        if (response) {
          this.setSession(response.data);
        }
        return this.getToken();
      } else {
        throw new Error("Refresh token not found");
      }
    } catch (error) {
      this.resetSession();
      throw error;
    }
  }

  check(forceRedirect = false, forceLoad = false): Promise<any> {
    this.checkConfig();
    return new Promise(async (resolve, reject) => {
      // VC-231 | Clear up unnecessary cookies.
      let currentCookies = JsCookies.get();
      for (const cookieName in currentCookies) {
        if (
          [
            "XSRF-TOKEN",
            "voapp_redirectTo",
            "vo_organisation",
            VoConfig.get.AUTH_STORAGE_REFRESH_TOKEN,
            VoConfig.get.AUTH_STORAGE_ACCESS_TOKEN,
          ].indexOf(cookieName) === -1
        ) {
          JsCookies.remove(cookieName);
          JsCookies.remove(cookieName, {
            domain: `.${VoConfig.get.AUTH_DOMAIN}`,
          });
        }
      }
      const token = this.getToken();
      if (token) {
        try {
          this.setSession(token, forceLoad);
          await this.loadUser(forceLoad);
          resolve(this.user);
        } catch (error) {
          reject(error);
        }
      } else {
        if (VoRouter.isCurrentRouterProtected() || forceRedirect) {
          VoRouter.redirectToLogin();
        } else {
          resolve(null);
        }
      }
    });
  }
  loadUser(force = false): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.user || force) {
          const response = await VoApi.getUser();
          this.user = response.data.data;
          this.ability.update(this.user.permissions);
          if (VoGroups.getCurrent(true)) {
            this.globalAbility.update(this.user.globalPermissions);
          }
        }
        resolve(this.user);
      } catch (error) {
        reject(error);
      }
    });
  }
  get currentUser() {
    return this.user;
  }

  getToken(): VoTokenType | void {
    try {
      let refreshTokenKey = VoConfig.get.AUTH_STORAGE_REFRESH_TOKEN || "";
      const refreshToken = JsCookies.get(refreshTokenKey);

      let accessTokenKey = VoConfig.get.AUTH_STORAGE_ACCESS_TOKEN || "";
      const accessToken = JsCookies.get(accessTokenKey);

      // let tokenTypeKey = VoConfig.get.AUTH_STORAGE_TOKEN_TYPE || "";
      // const tokenType = JsCookies.get(tokenTypeKey);

      // let expiresInKey = VoConfig.get.AUTH_STORAGE_EXPIRES_IN || "";
      // const expiresIn = JsCookies.get(expiresInKey);

      // if (refreshToken && accessToken && tokenType && expiresIn) {
      if (refreshToken) {
        return {
          refresh_token: refreshToken,
          access_token: accessToken || "",
          // token_type: tokenType,
          // expires_in: expiresIn,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // const getLoginUrl = () => {
  //     return 'http://localhost:8000/oauth/authorize?client_id=91c51b49-e705-4993-a8c7-497ee47e869e&redirect_uri=http://localhost:3000/auth&response_type=code&scope=*&state=' + state + '&code_challenge=' + challenge + '&code_challenge_method=S256'
  //   }

  initAuth(): { state: string; challenge: string } {
    try {
      let state = Helpers.createRandomString(40);
      let verifier = Helpers.createRandomString(128);
      let challenge = Helpers.base64Url(crypto.SHA256(verifier));

      let stateKey = VoConfig.get.AUTH_STORAGE_STATE || "";
      Helpers.localStorage.remove(stateKey);
      JsCookies.set(stateKey, state, {
        expires: 1,
        sameSite: "Lax",
        domain: VoConfig.get.AUTH_DOMAIN,
      });

      let verifierKey = VoConfig.get.AUTH_STORAGE_VERIFIER || "";
      Helpers.localStorage.remove(verifierKey);
      JsCookies.set(verifierKey, verifier, {
        expires: 1,
        sameSite: "Lax",
        domain: VoConfig.get.AUTH_DOMAIN,
      });

      let accessTokenKey = VoConfig.get.AUTH_STORAGE_ACCESS_TOKEN || "";
      Helpers.localStorage.remove(accessTokenKey);
      JsCookies.remove(accessTokenKey, {
        domain: VoConfig.get.AUTH_DOMAIN,
        sameSite: "Lax",
        expires: 1,
      });

      let refreshTokenKey = VoConfig.get.AUTH_STORAGE_REFRESH_TOKEN || "";
      Helpers.localStorage.remove(refreshTokenKey);
      JsCookies.remove(refreshTokenKey, {
        domain: VoConfig.get.AUTH_DOMAIN,
        sameSite: "Lax",
        expires: 1,
      });

      // let tokenTypeKey = VoConfig.get.AUTH_STORAGE_TOKEN_TYPE || "";
      // Helpers.localStorage.remove(tokenTypeKey);
      // JsCookies.remove(tokenTypeKey, {
      //   domain: VoConfig.get.AUTH_DOMAIN,
      //   sameSite: "Lax",
      //   expires: 12,
      // });

      return {
        state,
        challenge,
      };
    } catch (error) {
      throw error;
    }
  }
  getInitiatedAuth(): { state: string; verifier: string } {
    let stateKey = VoConfig.get.AUTH_STORAGE_STATE || "";
    // const state = Helpers.localStorage.get(stateKey);
    const state = JsCookies.get(stateKey);

    let verifierKey = VoConfig.get.AUTH_STORAGE_VERIFIER || "";
    // const verifier = Helpers.localStorage.get(verifierKey);
    const verifier = JsCookies.get(verifierKey);

    return {
      state: state || "",
      verifier: verifier || "",
    };
  }
}

export default new VoAuth("auth");
