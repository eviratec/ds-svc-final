"use strict";

class DataStudio {
  constructor () {

    const bcrypt = require("bcryptjs");
    const express = require("express");

    this.bcrypt = bcrypt;

    this.expressApp = express();

    this.expressApp.use(require("body-parser").json());

    this.db = require("./src/db")(this);

    require("./src/params")(this);

  }
}

const v4uuid = require("uuid/v4");
const dataStudio = new DataStudio();
const api = dataStudio.expressApp;
const crypt = dataStudio.bcrypt;


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
              res.send(303, `/auth/attempt/${attemptId}`);
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
        reject(new Error("ERR_INVALID_LOGIN: Invalid Login"));
      });

  });
}
