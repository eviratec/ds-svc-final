"use strict";

module.exports = function (dataStudio) {

  const api = dataStudio.expressApp;
  const db = dataStudio.db;

  api.use(function (req, res, next) {

    if (!req.headers["authorization"]) {
      req.authorized = false;
      return next();
    }

    req.auth = req.headers["authorization"];
    console.log(req.auth);

    next();

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
        req.authAttempt = null;
        next();
      });

  });

};
