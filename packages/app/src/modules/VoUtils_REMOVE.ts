import crypto from "crypto-js";

// @TODO Remove this file?

const base64Url = (string: crypto.lib.WordArray | String) => {
  return string
    .toString(crypto.enc.Base64)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const createRandomString = (num: number) => {
  return [...Array(num)].map(() => Math.random().toString(36)[2]).join("");
};

const localStorage = {
  set: (key: string, value: string) => {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error("localStorage", error);
      return false;
    }
  },
  get: (key: string) => {
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

const encodeQueryData = (data: encodeQueryDataType) => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

const regexPatterns = {
  username: /(^[a-z]{3,})([0-9]?)+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  stringNonDigit: /^[^0-9]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // At least 8 characters, 1 uppercase, 1 lowercase and 1 digit.
};

type errorObjectType = {
  message: string;
  fields?: {
    [key: string]: string;
  };
};

const getError = (error: any): errorObjectType => {
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

// const formatError = (error: string | [any]) => {
//   if (typeof error === "string") {
//     return error;
//   }
//   if (error.length === 1) {
//     return typeof error[0] === "object" ? error[0].message : error[0];
//   }
//   return (
//     <ul>
//       {error.map((v) => (
//         <li>{typeof error[0] === "object" ? error[0].message : error[0]}</li>
//       ))}
//     </ul>
//   );
// };

export {
  base64Url,
  createRandomString,
  localStorage,
  encodeQueryData,
  regexPatterns,
  getError,
};
