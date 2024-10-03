import axios from "axios";
import VoAuth from "./modules/VoAuth";
import VoRouter from "./modules/VoRouter";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Custom.
import I18n from "./modules/Services/I18n";

(function () {
  async function redirect() {
    try {
      //console.log("@vocollege/api->interceptor.ts->redirect()");
      Cookies.set("voapp_redirectTo", window.location.origin, {
        domain: ".vo-college.se",
        sameSite: "Lax",
      });
      await VoAuth.logout();
      VoRouter.redirectToLogout();
    } catch (error) {
      console.error("Interceptor", error);
      VoAuth.resetSession();
    }
  }

  //console.log("@vocollege/api->interceptor.ts");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  axios.interceptors.request.use((req) => {
    //console.log("Interceptor request", `${req.method} ${req.url}`);
    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const { config } = error;
      let isTokenRequest = config.url.includes("oauth/token");
      /*console.log(
        "@vocollege/api->interceptor.js - isTokenRequest: ",
        isTokenRequest,
      );*/
      try {
        if (
          !isTokenRequest &&
          [400, 401, 403].indexOf(error.response?.status) > -1
        ) {
          await VoAuth.refreshToken();
          const token: any = VoAuth.getToken();
          if (token) {
            config.headers["Authorization"] = "Bearer " + token.access_token;
            return axios.request(config);
          }
        }
      } catch (error) {}

      if (isTokenRequest) {
        toast.error(I18n.get.messages.sessionExpired, { autoClose: false });
        redirect();
      }
      return Promise.reject(error);
    },
  );
})();
