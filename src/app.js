
const CORS_ALLOW_ORIGINS = "*";
const CORS_ALLOW_HEADERS = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
const SERVER_NAME = require("./const/SERVER_NAME.js");
const SERVER_PROTOCOL = require("./const/SERVER_PROTOCOL.js");
const POWERED_BY = require("./const/POWERED_BY.js");

const LOCAL_REDIRECT_BASE = `${SERVER_PROTOCOL}://${SERVER_NAME}`;

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
      res.header("X-Powered-By", POWERED_BY);
      if ("options" !== req.method.toLowerCase()) {
        return next();
      }
      res.send(200);
    });

    this.expressApp.use(function(req, res, next) {
      res.localRedirect = function (location) {
        res.setHeader(LOCATION, `${LOCAL_REDIRECT_BASE}${location}`);
        res.status(303).send("");
      };
      next();
    });

    this.db = require("./db")();

    require("./events")(this);
    require("./params")(this);
    require("./routes")(this);

  }
}

module.exports = DataStudio;
