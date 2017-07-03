"use strict";

function requireAuthorization (req, res, next) {
  if (!req.authorized) {
    return res.send(403);
  }
  next();
}

module.exports = function (api, db) {

  api.get("/api/:apiId", requireAuthorization, function (req, res) {
    if (null === req.api) {
      return res.send(404);
    }
    res.send(200, req.api);
  });

  api.put("/api/:apiId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.del("/api/:apiId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.post("/apis", requireAuthorization, function (req, res) {
    res.send(404);
  });

};
