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

    db.fetchTokenByKey(req.headers["authorization"])
      .then(function (token) {

        if (!token) {
          return next();
        }

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

  api.param("appId", function (req, res, next, id) {

    req.appModel = null;

    db.fetchAppById(id)
      .then(function (app) {
        req.appModel = app;
        next();
      })
      .catch(function (err) {
        console.log(err);
        next();
      });

  });

  api.param("appApiId", function (req, res, next, id) {

    req.appApiModel = null;

    db.fetchAppApiById(id)
      .then(function (appApi) {
        req.appApiModel = appApi;
        next();
      })
      .catch(function (err) {
        next();
      });

  });

  api.param("appClientId", function (req, res, next, id) {

    req.appClientModel = null;

    db.fetchAppClientById(id)
      .then(function (appClient) {
        req.appClientModel = appClient;
        next();
      })
      .catch(function (err) {
        next();
      });

  });

  api.param("appSchemaId", function (req, res, next, id) {

    req.appSchemaModel = null;

    db.fetchAppSchemaById(id)
      .then(function (appSchema) {
        req.appSchemaModel = appSchema;
        next();
      })
      .catch(function (err) {
        next();
      });

  });

  api.param("userId", function (req, res, next, id) {

    req.user = null;

    db.fetchUserById(id)
      .then(function (user) {
        req.user = user;
        next();
      })
      .catch(function (err) {
        next();
      });

  });

  api.param("authAttemptId", function (req, res, next, id) {

    req.authAttempt = null;

    db.fetchAuthAttemptById(id)
      .then(function (authAttempt) {
        req.authAttempt = authAttempt;
        next();
      })
      .catch(function (err) {
        console.log(err);
        next();
      });

  });

};
