"use strict";
async function callTestHTTPFunction(functionName, body) {
  try {
    let response = await fetch(
      `http://localhost:5000/api-01-ht/us-central1/${functionName}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
      }
    );
    let json = await response.json();
    return json;
  } catch (error) {
    throw new Error("callTestHTTPFunction: " + error.message);
  }
}

export { callTestHTTPFunction };
