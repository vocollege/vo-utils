import VoApi from "./VoApi";
import VoConfig from "./VoConfig";
import VoRouter from "./VoRouter";
import { localStorage } from "./VoHelpers";
import { toast } from "react-toastify";
import I18n from "./Services/I18n";

class VoApp {
  configure(config: any, routes: any) {
    VoConfig.setConfig(config);
    VoRouter.setRoutes(routes);
    VoApi.init();
  }
  checkVersion() {
    let storedVersion: any = localStorage.get("vo_app_version");
    if (storedVersion) {
      storedVersion = parseFloat(storedVersion);
    }
    let currentVersion = parseFloat(VoConfig.get.APP_VERSION);
    if (currentVersion && currentVersion !== storedVersion) {
      toast.warning(I18n.get.messages.newVersionAvailable, {
        autoClose: false,
      });
      localStorage.set("vo_app_version", `${currentVersion}`);
      window.location.reload();
    }
  }
}
export default new VoApp();
