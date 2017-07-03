"use strict";

module.exports = function (dataStudio) {

  const api = dataStudio.expressApp;
  const db = dataStudio.db;

  const ROUTE_DEFINERS = [
    "api",
    "app",
    "user",
  ];

  ROUTE_DEFINERS.forEach(t => {
    require(`./routes/${t}`)(api, db);
  });

  return this;

}
