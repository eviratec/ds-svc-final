
const CORS_ALLOW_ORIGIN = "*";
const CORS_MAX_AGE = "60";
const CORS_ALLOW_CREDENTIALS = "true";
const CORS_ALLOW_METHODS = [
  "GET",
  "PUT",
  "POST",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
].join(", ");
const CORS_EXPOSE_HEADERS = [
  "Location",
].join(", ");
const CORS_ALLOW_HEADERS = [
  "Origin",
  "X-Requested-With",
  "Content-Type",
  "Referer",
  "Accept",
  "Authorization",
  "User-Agent",
].join(", ");

module.exports = (function () {

  return {
    max: {
      age: CORS_MAX_AGE,
    },
    allow: {
      origin: CORS_ALLOW_ORIGIN,
      credentials: CORS_ALLOW_CREDENTIALS,
      methods: CORS_ALLOW_METHODS,
      headers: CORS_ALLOW_HEADERS,
    },
    expose: {
      headers: CORS_EXPOSE_HEADERS,
    },
  };

})();
