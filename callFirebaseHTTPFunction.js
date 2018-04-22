"use strict";
export async function callFirebaseHTTPFunction(functionOptions) {
  try {
    let { name, options, authorization } = functionOptions;
    let fetchOptions = {};
    if (options) fetchOptions = options;
    if (authorization) {
      let token = "Bearer " + (await firebase.auth().currentUser.getIdToken());
      if (!fetchOptions.headers) fetchOptions.headers = {};
      fetchOptions.headers["Authorization"] = token;
    }
    let response = await fetch(
      `https://us-central1-api-01-ht.cloudfunctions.net/${name}`,
      fetchOptions
    );
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("callFirebaseHTTPFunction: " + error.message);
  }
}
