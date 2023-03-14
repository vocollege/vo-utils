import React from "react";
import { useEffect, useRef } from "react";

// Custom.

import VoConfig from "@vocollege/app/dist/modules/VoConfig";
import { useStyles } from "./styles";

export interface SessionProps {
  onChange?: (data: CallParams) => void;
  callParams?: null | CallParams;
}

export interface CallParams {
  action: string;
  [key: string]: any;
}

const Session: React.FC<SessionProps> = (props) => {
  const { onChange, callParams } = props;
  const classes = useStyles();
  const iframeEl = useRef<HTMLIFrameElement>(null);

  // Methods.

  const makeCall = (params: CallParams) => {
    if (iframeEl && iframeEl.current) {
      iframeEl.current.contentWindow?.postMessage(params, "*");
    }
  };

  const messageHandler = (event: MessageEvent) => {
    // if (!domains.includes(event.origin))
    //   return;  const { action, key, value } = event.data
    // if (action == 'save'){
    //   window.localStorage.setItem(key, JSON.stringify(value))
    // } else if (action == 'get') {
    //   event.source.postMessage({
    //     action: 'returnData',
    //     key,
    //     JSON.parse(window.localStorage.getItem(key))
    //   }, '*')
    // }

    const { action, key, value } = event.data;

    let allowedCall = false;
    switch (action) {
      case "sessionReady":
        makeCall({
          action: "getCurrentUser",
          key: "",
          value: "",
        });
        break;
      case "getCurrentUser":
      case "logout":
        allowedCall = true;
        break;
    }
    if (allowedCall && onChange) {
      onChange({ action, key, value });
    }
  };

  // Effects.

  useEffect(() => {
    window.addEventListener("message", messageHandler, false);
    return () => window.removeEventListener("message", messageHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (callParams) {
      makeCall(callParams);
    }
  }, [callParams]);

  return (
    <iframe
      title="vo-session-iframe"
      id="vo-session-iframe"
      ref={iframeEl}
      className={classes.iframe}
      src={`${VoConfig.get.ADMIN_BASE_URL}/session`}
    />
  );
};

export default Session;
