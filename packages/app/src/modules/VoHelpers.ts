import crypto from "crypto-js";
import he from "he";

// Custom.
import { GeneralObject } from "../global";

export const base64Url = (string: crypto.lib.WordArray | String) => {
  return string
    .toString(crypto.enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const createRandomString = (num: number) => {
  return [...Array(num)].map(() => Math.random().toString(36)[2]).join("");
};

export const localStorage = {
  set: (key: string, value: string) => {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error("localStorage", error);
      return false;
    }
  },
  get: (key: string) => {
    if (typeof window === "undefined") return false;
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error("localStorage", error);
      return false;
    }
  },
  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("localStorage", error);
    }
  },
};

type encodeQueryDataType = {
  [key: string]: any;
};

export const encodeQueryData = (data: encodeQueryDataType) => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

export const regexPatterns = {
  // username: /(^[a-z]{3,})([0-9]?)+$/,
  username: /(^[a-z]{3,})([\.]|[\_]|[a-z]|[0-9]?)+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  stringNonDigit: /^[^0-9]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // At least 8 characters, 1 uppercase, 1 lowercase and 1 digit.
  cleanName: /(^[A-Za-z]{1,})(\w|-?)+$/,
  personalNumber: /^(\d{8})[-]\d{4}$/,
  orgnr: /^(\d{6})[-]\d{4}$/,
};

type errorObjectType = {
  message: string;
  fields?: {
    [key: string]: string;
  };
};

export const getError = (error: any): errorObjectType => {
  let message = "";
  let fields: { [key: string]: string } = {};
  if (typeof error === "string") {
    message = error;
  }
  if (error.message) {
    message = error.message;
  } else if (error.debugMessage) {
    message = error.debugMessage;
  }
  if (
    error.graphQLErrors &&
    error.graphQLErrors[0].extensions.category &&
    error.graphQLErrors[0].extensions.category === "validation"
  ) {
    fields = Object.assign({}, error.graphQLErrors[0].extensions.validation);
  }
  const result: errorObjectType = {
    message,
  };
  if (Object.keys(fields).length > 0) {
    result.fields = fields;
  }
  return result;
};

export const getTemporaryId = () => {
  return `new_${Math.random().toString(36).substr(2, 12)}`;
};

export const createSlug2 = (value: string) => {
  var translate_re = /[öäåüÖÄÅÜ]/g;
  var translate: { [key: string]: any } = {
    å: "a",
    ä: "a",
    ö: "o",
    ü: "u",
    Å: "A",
    Ä: "A",
    Ö: "O",
    Ü: "U", // probably more to come
  };
  value = value.trim().replaceAll(" ", "-").toLocaleLowerCase();
  value = value.replace(translate_re, (match: any) => {
    return translate[match];
  });
  return value;
  // return encodeURIComponent(
  //   value.replace(translate_re, (match: any) => {
  //     return translate[match];
  //   })
  // );
};

export const wrapPromise = (promise: any) => {
  let status = "pending";
  let response: any;
  const suspender = promise.then(
    (res: any) => {
      status = "success";
      response = res;
    },
    (err: any) => {
      status = "error";
      response = err;
    }
  );
  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export const downloadFile = (url: string) => {
  try {
    let elId = `file-${url}`;

    // Ensure that an old element is not left in the DOM.
    let el = document.getElementById(elId);
    if (el !== null && el.parentNode) {
      el.parentNode.removeChild(el);
    }

    let anchor = document.createElement("a");
    anchor.id = elId;
    anchor.href = url;
    anchor.download = url;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      if (anchor.parentNode) {
        anchor.parentNode.removeChild(anchor);
      }
    }, 500);
  } catch (error) {
    throw error;
  }
};

export const orderByPosition = (a: any, b: any) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};

export const orderByField = (a: any, b: any, field: string) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};

export const shortenText = (
  str: string,
  limit = 30,
  stripHtml = true,
  addEllipsis = false
) => {
  let output = "";
  if (stripHtml) {
    output = str.replace(/(<([^>]+)>)/gi, "");
    output = he.decode(output);
  }
  if (addEllipsis) {
    output += "...";
  }
  return output.substring(0, limit).trim();
};

export const getImageContact = (item: any, width = 400, height = 400) => {
  let entity = item.entity || item;
  return entity.images && entity.images[0] && entity.images[0]?.url
    ? `${entity.images[0]?.url}?d=${width}x${height}`
    : "/images/avatar-user.png";
};

export const getImage = (
  item: any,
  width: number,
  height: number,
  field = "images"
) => {
  let entity =
    (item.images && item.images.length > 0) || !item.entity
      ? item
      : item.entity;
  return entity[field] && entity[field][0]
    ? `${entity[field][0]?.url}?d=${width}x${height}`
    : "/images/avatar-content.png";
};

export const getImageDescription = (item: any, field = "images") => {
  let entity =
    (item.images && item.images.length > 0) || !item.entity
      ? item
      : item.entity;
  return entity[field] && entity[field][0]?.description;
};

export const getContactName = (item?: GeneralObject) => {
  if (!item) {
    return "";
  }
  let name = [];
  if (item.firstname) {
    name.push(item.firstname);
  }
  if (item.lastname) {
    name.push(item.lastname);
  }
  if (name.length === 0) {
    name.push(item.name);
  }
  return name.join(" ");
};

export const getUserString = (item?: GeneralObject) => {
  if (!item) {
    return "";
  }
  return `${getContactName(item)} | ${item.email}`;
};

export const parseState = (state: any, initialState: any) => {
  let newState: GeneralObject = {};
  for (const field in initialState) {
    newState[field] = state[field];
  }
  return newState;
};

// This method is copied from
// https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
//
// @TODO Maybe this entire logic can be replaced by Array.reduce(),
// something like this:
// let data = is.split(".").reduce((o: any, i) => o && o[i], pbj);
// data = value;
//
export const changeObj = (obj: any, is: any, value: any): {} => {
  if (typeof is == "string") return changeObj(obj, is.split("."), value);
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
  else if (is.length == 0) return obj;
  else return changeObj(obj[is[0]], is.slice(1), value);
};

export const reducer = (state: any, action: any) => {
  const { key, values } = action;
  if (!key) {
    return { ...state, ...values };
  }
  if (key === "loading") {
    let i = state.loading.indexOf(values);
    let newValues = [...state.loading];
    if (i > -1) {
      newValues.splice(i, 1);
    } else {
      newValues.push(values);
    }
    return { ...state, loading: newValues };
  }
  if (key.indexOf(".") > -1) {
    changeObj(state, key, values);
    return { ...state };
  }
  return { ...state, [key]: values };
};

export const getGroupLogotype = (
  group: GeneralObject,
  logo = "logo2",
  output: GeneralObject[] = []
) => {
  if (group && Array.isArray(group[logo]) && group[logo].length > 0) {
    output.push.apply(output, group[logo]);
  } else if (group && group.parentGroups) {
    return group.parentGroups.forEach((v: any) => {
      return getGroupLogotype(v, logo, output);
    });
  }
  return null;
};

// export const makeId = (length = 10) => {
//   let result = "";
//   let characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

export const getObjValue = (obj: any, ...props: string[]): any => {
  return (
    obj &&
    props.reduce(
      (result, prop) => (result == null ? undefined : result[prop]),
      obj
    )
  );
};

/**
 * Convert an SVG into an image.
 * @param url
 * @param width
 * @param height
 * @param format
 * @param quality
 * @returns Promise
 *
 * @note Convert logic inpired by
 * https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
 * https://medium.com/@benjamin.black/using-blob-from-svg-text-as-image-source-2a8947af7a8e
 *
 * In this method we could actually assign "url" directly to "image.src" and then
 * extract an image with canvas, but Firefox doesn't support drawing an SVG into
 * canvas if it misses width/height attributes. Read more here:
 * https://stackoverflow.com/questions/28690643/firefox-error-rendering-an-svg-image-to-html5-canvas-with-drawimage
 * https://bugzilla.mozilla.org/show_bug.cgi?id=700533
 */
export const convertSvgToImage = (
  url: string,
  width: null | number = null,
  height: null | number = null,
  format = "image/png",
  quality = 0.92
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(url);
      let svg = await response.text();

      let parser = new DOMParser();
      let doc = parser.parseFromString(svg, "image/svg+xml");

      let viewBox = doc.documentElement.getAttribute("viewBox")?.split(" ");

      let canvas = document.createElement("canvas");
      if (!width) {
        canvas.width = viewBox && viewBox[2] ? parseInt(viewBox[2]) : 100;
      } else {
        canvas.width = width;
      }
      if (!height && !width) {
        canvas.height = viewBox && viewBox[3] ? parseInt(viewBox[3]) : 100;
      } else if (!height) {
        canvas.height =
          viewBox && viewBox[3]
            ? (parseInt(viewBox[3]) / parseInt(viewBox[2])) * canvas.width
            : 100;
      } else {
        canvas.height = height;
      }

      // These steps, to ensure that the SVG has width/height attributes
      // are only required because of Firefox.
      // Otherwise we could assign "url" directly to "image.src".
      let inlineSVG = doc.getElementsByTagName("svg")[0];
      inlineSVG.setAttribute("width", `${canvas.width}px`);
      inlineSVG.setAttribute("height", `${canvas.height}px`);
      let svg64 = btoa(new XMLSerializer().serializeToString(inlineSVG));
      let image64 = "data:image/svg+xml;base64," + svg64;

      let context = canvas.getContext("2d");
      let image = new Image();

      image.onload = () => {
        context?.drawImage(image, 0, 0);
        let result = canvas.toDataURL(format, quality);
        resolve(result);
      };
      image.src = image64;
    } catch (error) {
      reject(error);
    }
  });
};
