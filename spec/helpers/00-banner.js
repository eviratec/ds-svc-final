
(function banner () {

  const c = require("colors/safe");
  const pkg = require("../../package.json");

  console.log(`\n\n\n
********************************************************************************

  ${c.bold(c.blue("DataStudio REST API Service"))}
  ${c.dim(pkg.name + "@" + pkg.version)}

  ${c.bold("Test Suite")}

  Date: ${new Date()}
   ${c.dim("(ts) " + Date.now())}

--------------------------------------------------------------------------------
  `);
})();
