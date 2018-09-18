"use strict";
async function callTestHTTPFunction(functionOptions) {
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
      `http://localhost:5000/api-01-ht/${window.functionsRegion}/${name}`,
      fetchOptions
    );
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("callTestHTTPFunction: " + error.message);
  }
}

export { callTestHTTPFunction };
