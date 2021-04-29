import axios from "axios";
import VoAuth from "./modules/VoAuth";
import VoRouter from "./modules/VoRouter";

(function () {
  let retry = 0;

  async function redirect() {
    await VoAuth.logout();
    VoRouter.redirectToLogout();
  }
  axios.defaults.withCredentials = true;

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

              retry = 0;

              // Update the failed request with the new access token
              // in order to remake the call.
              if (token) {
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
        }
      }

      redirect();
      console.error("Interceptor", error);
      // return Promise.reject(error);
    }
  );
})();
