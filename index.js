"use strict";

const DataStudio = require("./src/app");

module.exports = function (port) {
  let datastudio = new DataStudio();
  datastudio.expressApp.listen(port, function () {

    console.log(`DataStudio API listening on port ${port}!`);

    false && datastudio.expressApp._router.stack.forEach(layer => {
      try {
        console.log(layer.route.path);
      }
      catch (e) {}
    });

  });
  return datastudio;
}
