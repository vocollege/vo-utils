import crypto from "crypto-js";

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

export const encodeQueryData = (data: encodeQueryDataType) => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

export const regexPatterns = {
  username: /(^[a-z]{3,})([0-9]?)+$/,
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

// const makeSortString = (function () {
//   var translate_re = /[öäåüÖÄÅÜ]/g;
//   var translate: { [key: string]: any } = {
//     å: "a",
//     ä: "a",
//     ö: "o",
//     ü: "u",
//     Å: "A",
//     Ä: "A",
//     Ö: "O",
//     Ü: "U", // probably more to come
//   };
//   return function (s: any) {
//     return s.replace(translate_re, function (match: any) {
//       return translate[match];
//     });
//   };
// })();

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

// export {
//   base64Url,
//   createRandomString,
//   localStorage,
//   encodeQueryData,
//   regexPatterns,
//   getError
// };
