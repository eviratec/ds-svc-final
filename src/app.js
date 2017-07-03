
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

    this.db = require("./src/db")();

    require("./src/params")(this);
    require("./src/routes")(this);

  }
}

module.exports = DataStudio;
