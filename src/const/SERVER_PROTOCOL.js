
module.exports = (function () {

  const DEFAULT_SERVER_PROTOCOL = "https";

  return process.env.DS_SERVER_PROTOCOL || DEFAULT_SERVER_PROTOCOL;

})();
