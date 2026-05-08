import axios from "axios";
import VoAuth from "./modules/VoAuth";
import VoRouter from "./modules/VoRouter";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Custom.
import I18n from "./modules/Services/I18n";

let isRefreshingToken = false;
let failedRequestQueue: any[] = [];

function retryFailedRequests() {
  if (failedRequestQueue.length && !isRefreshingToken) {
    failedRequestQueue.forEach((request) => {
      axios.request(request);
    });
    failedRequestQueue = [];
  }
}

async function redirect() {
  try {
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

(function () {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  axios.interceptors.request.use((req) => {
    const token = VoAuth.getToken();
    if (!req.headers.Authorization && token) {
      req.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const { config } = error;
      let isTokenRequest = config.url.includes("oauth/token");
      
      if (isTokenRequest) {
        toast.error(I18n.get.messages.sessionExpired, { autoClose: false });
        redirect();
        return Promise.reject(error);
      }

      try {
        if ([400, 401, 403].includes(error.response?.status)) {
          if (!isRefreshingToken && !config._retry) {
            isRefreshingToken = true;
            config._retry = true;

            try {
              const newToken = await VoAuth.refreshToken();
              config.headers.Authorization = `Bearer ${newToken?.access_token}`;
              retryFailedRequests();
              return axios(config);
            } catch (refreshError) {
              redirect();
              return Promise.reject(refreshError);
            } finally {
              isRefreshingToken = false;
            }
          }
        }
          /*await VoAuth.refreshToken();
          const token: any = VoAuth.getToken();
          if (token) {
            config.headers["Authorization"] = "Bearer " + token.access_token;
            return axios.request(config);
          }
        }*/
      } catch (error) {
        console.error("Interceptor error:", error);
      }

      
      return Promise.reject(error);
    },
  );
})();
