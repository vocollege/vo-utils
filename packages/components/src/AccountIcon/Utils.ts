import { CallParams } from "./Session";

// @TODO REMOVE?

class Utils {
  iframe: null | HTMLIFrameElement | HTMLElement = null;
  __seq = 0;

  setIframe() {
    if (typeof document === "undefined") return;
    this.iframe = document.getElementById("vo-session-iframe");
  }

  call(params: CallParams) {
    if (typeof document === "undefined") return;
    if (!this.iframe) {
      this.setIframe();
    }
    return new Promise((resolve, reject) => {
      if (!this.iframe) {
        reject();
      }
      let seq = ++this.__seq;
      let eventRef = window.addEventListener(
        "message",
        (resp: MessageEvent) => {
          if (resp.data.action === params.action && resp.data.__seq == seq) {
            resolve(resp.data);
            // window.removeEventListener("message", this);
          } else {
            resolve(false);
          }
        },
        false
      );

      if (this.iframe && "contentWindow" in this.iframe) {
        this.iframe?.contentWindow?.postMessage({ ...params, __seq: seq }, "*");
      }
    });
  }

  messageHandler(data: any, promise: { [key: string]: any }) {
    // if (data.action === params.action && resp.data.__seq == seq) {
    //   resolve(resp.data);
    //   // window.removeEventListener("message", this);
    // }
    // if (params.action === params.action && params.__seq == seq) {
    //   promise.resolve(resp.data);
    // } else {
    //   promise.reject(false);
    // }
    // const { action, key, value } = event.data;
    // switch (action) {
    //   case "checkAbility":
    //     console.log("Utils.ts messageHandler");
    //     console.log("action", action);
    //     console.log("value", value);
    //     break;
    // }
    // (resp: MessageEvent) => {
    //     //   console.log("resp.data.action", resp.data.action);
    //     //   if (resp && resp.data && resp.data.__seq && resp.data.__seq == seq) {
    //     //     // window.removeEventListener("message", eventRef);
    //     //     // resolve(resp.data);
    //     //   }
    //     if (resp.data.action === params.action && resp.data.__seq == seq) {
    //       resolve(resp.data);
    //     } else {
    //       reject(false);
    //     }
    //   },
  }
}

export default new Utils();
