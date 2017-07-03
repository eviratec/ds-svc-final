"use strict";

module.exports = function (api, db) {

  api.get("/api/:apiId", function (req, res) {
    if (null === req.api) {
      return res.send(404);
    }
    res.send(200, req.api);
  });

  api.put("/api/:apiId", function (req, res) {
    res.send(404);
  });

  api.del("/api/:apiId", function (req, res) {
    res.send(404);
  });

  api.post("/apis", function (req, res) {
    res.send(404);
  });

};
