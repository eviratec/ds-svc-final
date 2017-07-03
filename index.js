"use strict";

const CORS_ALLOW_ORIGINS = "*";
const CORS_ALLOW_HEADERS = "Origin, X-Requested-With, Content-Type, Accept, Authorization";

const DataStudio = require("./src/app");

const v4uuid = require("uuid/v4");
const dataStudio = new DataStudio();

dataStudio.expressApp.listen(3000, function () {

  console.log("Example app listening on port 3000!");

  api._router.stack.forEach(layer => {
    let x = JSON.stringify(layer.route);
    if (undefined === x) {
      return;
    }
    console.log(layer.route.path);
  });

});
