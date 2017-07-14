"use strict";

module.exports = function (dataStudio) {

  const ROUTE_DEFINERS = [
    "api",
    "app",
    "client",
    "schema",
    "user",
  ];

  ROUTE_DEFINERS.forEach(t => {
    require(`./routes/${t}`)(dataStudio);
  });

  return this;

}
