# ht-client-helper-functions

## Warning

Firebase functions automatically parse body, when receive if request have header => "Content-Type": "application/json"

## Authorization

For user identity add Authorization header with firebase tokenId
```
tokenId = await firebase.auth().currentUser.getIdToken()
```

Authorization header adding automatically when authorization: true

```
// on client
// 
// header 
callTestHTTPFunction({
  name: "httpsFunction",
  options: {
    method: "POST",
    authorization: true,
    body: JSON.stringify(body)
  }
})

// on server
const tokenId = req.get("Authorization").split("Bearer ")[1];
const decodedToken = await admin.auth().verifyIdToken(tokenId);
const userId = decodedToken.uid;
```
