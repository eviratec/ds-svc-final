"use strict";

const DataStudio = require("./src/app");
const dataStudio = new DataStudio();

dataStudio.expressApp.listen(3000, function () {

  console.log("Example app listening on port 3000!");

  dataStudio.expressApp._router.stack.forEach(layer => {
    try {
      console.log(layer.route.path);
    }
    catch (e) {}
  });

});
