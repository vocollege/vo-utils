import Cookies from "js-cookie";

// Custom.
import VoConfig from "./VoConfig";

type RoutesType = {
  [key: string]: any;
};

class VoRouter {
  routes: RoutesType = {};
  getRoutes() {
    return this.routes;
  }
  setRoutes(routes: RoutesType) {
    this.routes = routes;
  }
  getPath(path: String, arg: number) {
    if (path === "/") {
      return "root";
    }
    const params = path.split("/");
    if (params[0] === "") {
      params.shift();
    }
    return params[arg];
  }
  isCurrentRouterProtected() {
    if (typeof window === "undefined") return false;
    const currentPath = this.getPath(window.location.pathname, 0);
    // const routes = VoConfig.getConfigByKey('routes');
    const routes = this.getRoutes();
    return routes.hasOwnProperty(currentPath) && routes[currentPath].protected;
  }
  isAuthRoute() {
    const currentPath = this.getPath(window.location.pathname, 0);
    return (
      currentPath === (VoConfig.get.AUTH ? VoConfig.get.AUTH.substring(1) : "")
    );
    // return currentPath === VoConfig.getConfigByKey('app').AUTH.substring(1);
  }
  redirectToLogin() {
    // if (VoRouter.isCurrentRouterProtected()) {
    //     window.location.href = VoConfig.getConfigByKey('app').LOGIN;
    // }
    // window.location.href = VoConfig.getConfigByKey('app').LOGIN;
    window.location.href = VoConfig.get.LOGIN || "";
  }
  redirectToLogout() {
    const webUrl = [];
    if (VoConfig.get.AUTH_BASE_URL) {
      webUrl.push(VoConfig.get.AUTH_BASE_URL + "/logout");
      let redirectTo = Cookies.get("voapp_redirectTo") || VoConfig.get.BASE_URL;
      if (redirectTo) {
        webUrl.push(`?redirect=${redirectTo}`);
      }
      // if (VoConfig.get.BASE_URL) {
      //   webUrl.push(`?redirect=${VoConfig.get.BASE_URL}`);
      // }
    }
    if (webUrl.length > 0) {
      window.location.href = webUrl.join("");
    }
  }
  redirectToHome() {
    window.location.href = VoConfig.get.HOME || "";
  }
  pathIsActive(to: string): boolean {
    const splittedTo = to.split("/");
    const toPath = splittedTo[0] === "" ? splittedTo[1] : splittedTo[0];
    const currentPath = this.getPath(window.location.pathname, 0);
    return toPath === currentPath || (toPath === "" && currentPath === "root");
  }
}
export default new VoRouter();
