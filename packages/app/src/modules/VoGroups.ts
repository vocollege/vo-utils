import { localStorage } from "./VoHelpers";
import VoConfig from "./VoConfig";
import { GeneralObject } from "../global";

class VoGroups {
  getCurrent(getFromDomain = false): null | GeneralObject {
    const group: any = localStorage.get(VoConfig.get.CURRENT_GROUP);
    if (group) {
      return JSON.parse(group);
    }
    if (getFromDomain) {
      let groupName = this.getGroupNameFromDomain(window.location.host);
      if (groupName && groupName !== "") {
        return { id: groupName };
      }
    }
    return null;
  }
  getGroupNameFromDomain(host: string) {
    let subdomain = host?.split(".")[0];
    let localIndex = subdomain?.indexOf("local");
    if (localIndex !== undefined && localIndex > -1) {
      let hyphenIndex = subdomain?.indexOf("-") || 0;
      subdomain = subdomain?.substring(hyphenIndex + 1);
    }
    if (["admin", "cert", "front"].indexOf(subdomain) > -1) {
      // if (subdomain === "admin") {
      return null;
    }
    return subdomain;
  }
}

export default new VoGroups();
