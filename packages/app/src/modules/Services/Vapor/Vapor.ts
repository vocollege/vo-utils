// Based on https://github.com/laravel/vapor-js/blob/master/src/index.js
// I thought had to change withCredentials and remove headers.Authorization
// from the call to AWS S3, which was causing strange CORS issues.

import axios from "axios";

// export interface VaporStoreOptions {
//   bucket?: string;
//   contentType?: string;
//   expires?: string;
//   visibility?: string;
//   baseURL?: string;
//   headers?: any;
//   options?: any;
// }

class Vapor {
  /**
   * Store a file in S3 and return its UUID, key, and other information.
   */
  async store(file: any, options: { [key: string]: any } = {}) {
    const response = await axios.post(
      // "/vapor/signed-storage-url",
      "/api/v1/vapor/signed-storage-url",
      {
        bucket: options.bucket || "",
        content_type: options.contentType || file.type,
        expires: options.expires || "",
        visibility: options.visibility || "",
      },
      {
        baseURL: options.baseURL || null,
        headers: options.headers || {},
        ...options.options,
      }
    );

    const instance = axios.create();
    delete instance.defaults.headers.common["Authorization"];
    instance.defaults.withCredentials = false;

    let headers = response.data.headers;

    if ("Host" in headers) {
      delete headers.Host;
    }

    if (typeof options.progress === "undefined") {
      options.progress = () => {};
    }

    const cancelToken = options.cancelToken || "";

    await instance.put(response.data.url, file, {
      cancelToken: cancelToken,
      headers: headers,
      // onUploadProgress: function (progressEvent: any) {
      //   // console.log("progressEvent.loaded", progressEvent.loaded);
      //   // options.progress(progressEvent.loaded / progressEvent.total);
      //   // let percentCompleted = Math.round(
      //   //   (progressEvent.loaded * 100) / progressEvent.total
      //   // );
      //   // console.log(
      //   //   "onUploadProgress called with",
      //   //   arguments,
      //   //   "Percent Completed:" + percentCompleted
      //   // );
      // },
    });

    response.data.extension = file.name.split(".").pop();

    return response.data;
  }
}

export default new Vapor();
