"use strict";

const CORS_ALLOW_ORIGINS = "*";
const CORS_ALLOW_HEADERS = "Origin, X-Requested-With, Content-Type, Accept, Authorization";

class DataStudio {
  constructor () {

    const bcrypt = require("bcryptjs");
    const express = require("express");

    this.bcrypt = bcrypt;

    this.expressApp = express();

    this.expressApp.use(require("body-parser").json());

    this.expressApp.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", CORS_ALLOW_ORIGINS);
      res.header("Access-Control-Allow-Headers", CORS_ALLOW_HEADERS);
      if ("options" !== req.method.toLowerCase()) {
        return next();
      }
      res.send(200);
    });

    this.db = require("./src/db")(this);

    require("./src/params")(this);

  }
}

const v4uuid = require("uuid/v4");
const dataStudio = new DataStudio();
const api = dataStudio.expressApp;
const crypt = dataStudio.bcrypt;

const RESERVED_LOGINS = require("./src/etc/reserved.usernames.json");

function requireAuthorization (req, res, next) {
  if (!req.authorized) {
    return res.send(403);
  }
  next();
}

function reservedLogin (Login) {
  let login = Login.toLowerCase();
  return RESERVED_LOGINS.indexOf(login) > -1;
}

function pwHash (password) {
  let crypt = dataStudio.bcrypt;
  var salt = crypt.genSaltSync(10);
  return crypt.hashSync(password, salt);
}

function checkLoginAvailability (Login) {
  return new Promise((resolve, reject) => {
    let db = dataStudio.db;

    if (Login.length < 5 || reservedLogin(Login)) {
      return reject({
        Login: Login,
        Available: false,
        Reason: "RESERVED",
      });
    }

    db.fetchUserByLogin(Login)
      .then(function (user) {

        if (!user) {
          return resolve({
            Login: Login,
            Available: true,
          });
        }

        reject({
          Login: Login,
          Available: false,
        });

      })
      .catch(function (err) {
        reject({
          Login: Login,
          Available: false,
        });
      });
  });
}

api.get("/login/:login/availability", function (req, res) {

  let Login = req.params.login.toLowerCase();

  checkLoginAvailability(Login)
    .then(function (r) {
      res.send(200, r);
    })
    .catch(function () {
      res.send(200, r);
    });

});

api.get("/signup/:signupId", function (req, res) {
  if (req.signup) {
    res.send(200, req.signup);
    return;
  }
  res.send(404);
});

function checkUsernameAvailability (req, res, next) {
  checkLoginAvailability(req.body.Email.toLowerCase())
    .then(function () {
      next();
    })
    .catch(function () {
      res.send(400, { ErrorMsg: 'Login/email unavailable' });
    });
}

api.post("/signups", checkUsernameAvailability, function (req, res) {

  let db = dataStudio.db;
  let User = db.User;
  let Hash = db.Hash;

  let Email = req.body.Email.toLowerCase();
  let NewPassword = pwHash(req.body.NewPassword);

  let Login = Email;

  let tsNow = Math.floor(Date.now()/1000);

  let user;
  let hash;

  let userId = v4uuid();
  let hashId = v4uuid();

  createUserAndHash();

  function createUser () {
    return new Promise((resolve, reject) => {
      user = new User({
        Id: userId,
        Login: Login,
        Created: tsNow,
      });
      user.save()
        .then(function () {
          resolve(user);
        })
        .catch(reject);
    });
  }

  function createUserPassword () {
    return new Promise((resolve, reject) => {
      hash = new Hash({
        Id: hashId,
        Value: NewPassword,
        OwnerId: userId,
      });
      hash.save()
        .then(function () {
          resolve(hash);
        })
        .catch(reject);
    });
  }

  function createUserAndHash () {
    Promise
      .all([
        createUserPassword(),
        createUser(),
      ])
      .then(function () {
        res.send(202);
      })
      .catch(handleErr);
  }

  function handleErr (err) {
    let msg = err.message;
    res.send(400, { ErrorMsg: msg });
  }

});

api.post("/auth/attempts", function (req, res) {

  let db = dataStudio.db;
  let AuthAttempt = db.AuthAttempt;
  let Token = db.Token;

  if (!req.body.Login || !req.body.Password) {
    return res.send(400, { ErrorMsg: "ERR_INCOMPLETE: Missing Login or Password" })
  }

  let attemptId = v4uuid();

  let attempt = new AuthAttempt({
    Id: attemptId,
    Login: req.body.Login,
    Finished: false,
    Error: null,
    TokenId: null,
    Created: new Date(),
  });

  function createToken (user, expiry) {
    let tokenId = v4uuid();
    let tsNow = Math.floor(Date.now()/1000);
    let token = new Token({
      Id: tokenId,
      UserId: user.get("Id"),
      Key: `${tokenId}/${user.get("Id")}/${tsNow}`,
      Created: tsNow,
      Expiry: expiry || 3600,
    });
    return token.save();
  }

  verifyAuthN(req.body.Login, req.body.Password)
    .then(function (user) {

      createToken(user, 86400)
        .then(function (token) {
          attempt.save({Finished: true, TokenId: token.get("Id")})
            .then(function () {
              res.setHeader('Location', `/auth/attempt/${attemptId}`);
              res.send(303);
            })
            .catch(function (err) {
              console.log(err);
              res.send(400, { ErrorMsg: err.message });
            });
        })
        .catch(function (err) {
          console.log(err);
          res.send(400, { ErrorMsg: err.message });
        });
    })
    .catch(function (err) {
      console.log(err);
      attempt.Error = err.message;
      attempt.Finished = true;
      attempt.save({Finished: true, Error: err.message})
        .then(function () {
          res.send(400, { ErrorMsg: err.message });
        })
        .catch(function () {
          res.send(400, { ErrorMsg: err.message });
        });
    });
});

api.get("/auth/attempt/:authAttemptId", function (req, res) {
  res.send(200, req.authAttempt);
});

api.get("/user/:userId", function (req, res) {
  if (null === req.user) {
    return res.send(404);
  }
  res.send(200, req.user);
});

api.post("/apps", requireAuthorization, function (req, res) {
  let db = dataStudio.db;
  let App = db.App;
  let newAppId = v4uuid();
  let newApp = {
    Id: newAppId,
    UserId: req.authUser.get("Id"),
    Name: req.body.Name || "Un-named App",
    Created: Math.floor(Date.now()/1000),
  };
  App.forge(newApp)
    .save(null, {method:"insert"})
    .then(function (app) {
      res.setHeader('Location', `/app/${newAppId}`);
      res.send(303);
    })
    .catch(function (err) {
      console.log(err);
      res.send(400, { ErrorMsg: err.message });
    });
});

api.get("/app/:appId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  let db = dataStudio.db;
  db.fetchDetailedAppById(req.appModel.get("Id"))
    .then(function (app) {
      res.send(200, app);
    })
    .catch(function (err) {
      res.send(400, {
        Error: err.message,
      });
    });
});

api.del("/app/:appId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  req.appModel.save({"Deleted": Math.floor(Date.now()/1000)}, {patch: true})
    .then(function () {
      res.send(204);
    })
    .catch(function (err) {
      console.log(err);
      res.send(500);
    });

});

api.get("/apps/all", function (req, res) {
  if (!req.authorized) {
    return res.send(200, []);
  }
  let db = dataStudio.db;
  db.fetchAppsByUserId(req.authUser.get("Id"))
    .then(function (apps) {
      res.send(200, apps);
    })
    .catch(function (err) {
      res.send(500, { ErrorMsg: err.message });
    });
});


[
  {id: "schemas", fetch: "fetchAppSchemasByAppId"},
  {id: "apis", fetch: "fetchAppApisByAppId"},
  {id: "clients", fetch: "fetchAppClientsByAppId"},
].forEach(x => {

  let tId = x.id;
  let tFn = x.fetch;

  api.get(`/app/:appId/${tId}`, requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.send(403);
    }
    let db = dataStudio.db;
    db[tFn](req.appModel.get("Id"))
      .then(function (schemas) {
        res.send(200, schemas);
      })
      .catch(function (err) {
        res.send(500, { ErrorMsg: err.message });
      });
  });

});

api.post("/app/:appId/apis", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  let db = dataStudio.db;
  let AppApi = db.AppApi;
  let appId = req.appModel.get("Id");
  let newAppApiId = v4uuid();
  let newAppApi = new AppApi({
    Id: newAppApiId,
    AppId: appId,
    Name: req.body.Name || "NewApi",
    Created: Math.floor(Date.now()/1000),
  });
  newAppApi.save()
    .then(function (appApi) {
      res.setHeader('Location', `/app/${appId}/api/${appApi.get("Id")}`);
      res.send(303);
    })
    .catch(function (err) {
      res.send(400, { ErrorMsg: err.message });
    });
});

api.post("/app/:appId/clients", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  let db = dataStudio.db;
  let AppClient = db.AppClient;
  let appId = req.appModel.get("Id");
  let newAppClientId = v4uuid();
  let newAppClient = new AppClient({
    Id: newAppClientId,
    AppId: appId,
    Name: req.body.Name || "NewClient",
    Created: Math.floor(Date.now()/1000),
  });
  newAppClient.save()
    .then(function (appClient) {
      res.setHeader('Location', `/app/${appId}/client/${appClient.get("Id")}`);
      res.send(303);
    })
    .catch(function (err) {
      res.send(400, { ErrorMsg: err.message });
    });
});

api.post("/app/:appId/schemas", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  let db = dataStudio.db;
  let AppSchema = db.AppSchema;
  let appId = req.appModel.get("Id");
  let newAppSchemaId = v4uuid();
  let newAppSchema = new AppSchema({
    Id: newAppSchemaId,
    AppId: appId,
    Name: req.body.Name || "NewSchema",
    Ref: req.body.Ref || "#" + req.body.Name,
    Created: Math.floor(Date.now()/1000),
  });
  newAppSchema.save()
    .then(function (appSchema) {
      res.setHeader('Location', `/app/${appId}/schema/${appSchema.get("Id")}`);
      res.send(303);
    })
    .catch(function (err) {
      res.send(400, { ErrorMsg: err.message });
    });
});

api.del("/app/:appId/schema/:appSchemaId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  if (req.appSchemaModel.get("AppId") !== req.appModel.get("Id")) {
    return res.send(400);
  }
  req.appSchemaModel.save({"Deleted": Math.floor(Date.now()/1000)}, {patch: true})
    .then(function () {
      res.send(204);
    })
    .catch(function (err) {
      console.log(err);
      res.send(500);
    });

});

api.get("/app/:appId/api/:appApiId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  if (req.appApiModel.get("AppId") !== req.appModel.get("Id")) {
    return res.send(400);
  }
  res.send(200, req.appApiModel);
});

api.get("/app/:appId/client/:appClientId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  if (req.appClientModel.get("AppId") !== req.appModel.get("Id")) {
    return res.send(400);
  }
  res.send(200, req.appClientModel);
});

api.get("/app/:appId/schema/:appSchemaId", requireAuthorization, function (req, res) {
  if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
    return res.send(403);
  }
  if (req.appSchemaModel.get("AppId") !== req.appModel.get("Id")) {
    return res.send(400);
  }
  res.send(200, req.appSchemaModel);
});

api.listen(3000, function () {
  console.log("Example app listening on port 3000!")
});

function verifyAuthN (Login, Password) {
  return new Promise((resolve, reject) => {

    const db = dataStudio.db;

    if (!Login || !Password) {
      return reject(new Error());
    }

    db.fetchUserByLogin(Login)
      .then(function (user) {

        db.fetchHashByOwnerId(user.get("Id"))
          .then(function (hash) {
            let passwordCorrect = crypt.compareSync(Password, hash.get("Value"));
            if (passwordCorrect) {
              return resolve(user);
            }
            reject(new Error("ERR_INVALID_PASSWORD: Invalid/incorrect Password"));
          })
          .catch(function (err) {
            reject(new Error("ERR_NO_PASSWORD: Login failed"));
          });

      })
      .catch(function (err) {
        console.log(err);
        reject(new Error("ERR_INVALID_LOGIN: Invalid Login"));
      });

  });
}
