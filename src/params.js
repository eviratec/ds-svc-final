"use strict";

module.exports = function (dataStudio) {

  const api = dataStudio.expressApp;
  const db = dataStudio.db;

  api.use(function (req, res, next) {

    let authPt;

    req.authorized = false;
    req.authUser = null;
    req.authToken = null;

    if (!req.headers["authorization"]) {
      return next();
    }

    req.auth = req.headers["authorization"];

    db.fetchTokenByKey(req.auth)
      .then(function (token) {
        req.authorized = true;
        req.authUser = token.related("User");
        req.authToken = token;
        next();
      })
      .catch(function (err) {
        console.log(err);
        next();
      });

  });

  api.param("userId", function (req, res, next, id) {

    db.fetchUserById(id)
      .then(function (user) {
        req.user = user;
        next();
      })
      .catch(function (err) {
        req.user = null;
        next();
      });

  });

  api.param("authAttemptId", function (req, res, next, id) {

    db.fetchAuthAttemptById(id)
      .then(function (authAttempt) {
        req.authAttempt = authAttempt;
        next();
      })
      .catch(function (err) {
        console.log(err);
        req.authAttempt = null;
        next();
      });

  });

};
