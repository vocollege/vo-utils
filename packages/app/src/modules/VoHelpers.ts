import crypto from "crypto-js";
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
  cleanName: /(^[A-Za-z]{1,})(\w?)+$/,
  personalNumber: /^(\d{8})[-]\d{4}$/,
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

export const shortenText = (str: string, limit = 30, stripHtml = true) => {
  let output = "";
  if (stripHtml) {
    output = str.replace(/(<([^>]+)>)/gi, "");
  }
  return output.substring(0, limit);
};

export const getImageContact = (item: any, width = 400, height = 400) => {
  let entity = item.entity || item;
  return entity.images && entity.images[0]
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

export const getContactName = (item: GeneralObject) => {
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

export const parseState = (state: any, initialState: any) => {
  let newState: GeneralObject = {};
  for (const field in initialState) {
    newState[field] = state[field];
  }
  return newState;
};

// This method is copied from
// https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
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
