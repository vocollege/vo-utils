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

  messageHandler(data: any, promise: { [key: string]: any }) {}
}

export default new Utils();
