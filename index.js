"use strict";

const DataStudio = require("./src/app");

module.exports = function (port, verbose) {
  let datastudio = new DataStudio();
  datastudio.server = datastudio.expressApp.listen(port, function () {

    verbose && console.log(`DataStudio API listening on port ${port}!`);

    verbose && datastudio.expressApp._router.stack.forEach(layer => {
      try {
        console.log(layer.route.path);
      }
      catch (e) {}
    });

  });
  return datastudio;
}
