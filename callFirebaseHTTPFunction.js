"use strict";
async function callFirebaseHTTPFunction(functionOptions) {
  try {
    let {
      name,
      options,
      authorization,
      functionsRegion,
      projectId
    } = functionOptions;
    let fetchOptions = {};
    if (options) fetchOptions = options;
    let headers = new Headers();
    if (fetchOptions.headers) {
      headers = new Headers(fetchOptions.headers);
    }
    if (authorization) {
      let token = "Bearer " + (await firebase.auth().currentUser.getIdToken());
      headers.set("Authorization", token);
    }
    fetchOptions.headers = headers;
    let response = await fetch(
      `https://${functionsRegion ? functionsRegion : "us-central1"}-${
        projectId ? projectId : window.appConfig.projectId
      }.cloudfunctions.net/${name}`,
      fetchOptions
    );
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("callFirebaseHTTPFunction: " + error.message);
  }
}

export { callFirebaseHTTPFunction };
