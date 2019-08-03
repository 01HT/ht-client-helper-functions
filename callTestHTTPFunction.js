"use strict";
async function callTestHTTPFunction(functionOptions) {
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
      `http://localhost:5000/${
        projectId ? projectId : window.appConfig.projectId
      }/${functionsRegion ? functionsRegion : "us-central1"}/${name}`,
      fetchOptions
    );
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("callTestHTTPFunction: " + error.message);
  }
}

export { callTestHTTPFunction };
