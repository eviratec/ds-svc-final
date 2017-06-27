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

const dataStudio = new DataStudio();
const api = dataStudio.expressApp;
const crypt = dataStudio.bcrypt;

api.post("/auth/attempts", function (req, res) {
  verifyAuthN(req.body.Login, req.body.Password)
    .then(function (user) {
      res.send(200, user);
      // res.send(303, `/auth/attempt/${authAttempt.Id}`);
    })
    .catch(function (err) {
      console.log(err);
      res.send(400, { ErrorMsg: err.message });
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
      return reject(new Error("ERR_INCOMPLETE: Missing Login or Password"));
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
