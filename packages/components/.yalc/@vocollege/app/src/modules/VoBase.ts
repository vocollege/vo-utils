import VoConfig from "./VoConfig";

class VoBase {
  configKey: string;
  constructor(key: string) {
    this.configKey = key;
  }
  checkConfig() {
    if (VoConfig.get.BASE_URL === "") {
      throw new Error(
        "VoApp is not configured properly. You need to initiate it with VoApp.configure() method."
      );
    }
  }
  get getUrl() {
    let envKey = `${this.configKey.toUpperCase()}_BASE_URL`;
    let endpointKey = `${this.configKey.toUpperCase()}_ENDPOINT`;
    return VoConfig.get[envKey] + "" + VoConfig.get[endpointKey];

    // let envKey = `REACT_APP_${this.configKey.toUpperCase()}_BASE_URL`;
    // let endpointKey = `REACT_APP_${this.configKey.toUpperCase()}_ENDPOINT`;
    // return process.env[envKey] + '' + process.env[endpointKey];
  }
}
export default VoBase;
