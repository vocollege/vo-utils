import axios from "axios";
import VoAuth from "./modules/VoAuth";
import VoRouter from "./modules/VoRouter";
import { toast } from "react-toastify";

// Custom.
import I18n from "./modules/Services/I18n";

(function () {
  let retry = 0;

  async function redirect() {
    try {
      await VoAuth.logout();
      VoRouter.redirectToLogout();
    } catch (error) {
      console.error("Interceptor", error);
    }
  }

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  axios.interceptors.request.use((req) => {
    // console.log('Interceptor request', `${req.method} ${req.url}`);
    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const status = error.response ? error.response.status : null;

      if (status && retry < 2) {
        retry++;
        switch (status) {
          case 400:
          case 401:
          case 403:
            try {
              await VoAuth.refreshToken();
              const token: any = VoAuth.getToken();

              // Update the failed request with the new access token
              // in order to redo the call.
              if (token) {
                retry = 0;
                error.config.headers["Authorization"] =
                  token.token_type + " " + token.access_token;
              }

              return axios.request(error.config);
            } catch (error) {
              redirect();
              console.error("Interceptor", error);
              // return Promise.reject(error);
            }
            break;
          // case 419:
          //   console.log("LOG OUT");
          //   break;
        }
      }

      // redirect();
      // console.error("Interceptor", error);
      // return Promise.reject(error);
      return new Promise((resolve, reject) => {
        if (status && status === 419) {
          toast.error(I18n.get.messages.sessionExpired);
          setTimeout(() => {
            redirect();
          }, 5000);
        } else {
          reject(error);
        }
        console.error("Interceptor", error);
      });
    }
  );
})();
