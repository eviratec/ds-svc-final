
module.exports = (function () {

  const DEFAULT_SERVER_NAME = "api.datastudio.localhost";

  return process.env.DS_SERVER_NAME || DEFAULT_SERVER_NAME;

})();
