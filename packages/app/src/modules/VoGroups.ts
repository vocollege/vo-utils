import { localStorage } from "./VoHelpers";
import VoConfig from "./VoConfig";
import { GeneralObject } from "../global";

class VoGroups {
  getCurrent(): null | GeneralObject {
    const group: any = localStorage.get(VoConfig.get.CURRENT_GROUP);
    return group ? JSON.parse(group) : null;
  }
}

export default new VoGroups();
