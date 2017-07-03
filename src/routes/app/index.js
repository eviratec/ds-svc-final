"use strict";

module.exports = function (api, db) {

  api.get("/app/:appId", function (req, res) {
    if (null === req.app) {
      return res.send(404);
    }
    res.send(200, req.app);
  });

  api.get("/apps/all", function (req, res) {
    if (!req.authorized) {
      return res.send(200, []);
    }
    db.fetchAppsByUserId(req.authUser.get("Id"))
      .then(function (apps) {
        res.send(200, apps);
      })
      .catch(function (err) {
        res.send(500, { ErrorMsg: err.message });
      });
  });

};
