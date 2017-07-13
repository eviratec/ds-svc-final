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

  api.delete("/api/:apiId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.post("/apis", requireAuthorization, function (req, res) {
    let AppApi = db.AppApi;
    let newAppApiId = v4uuid();
    let newAppApi = new AppApi({
      Id: newAppApiId,
      AppId: req.body.AppId,
      Name: req.body.Name || "NewApi",
      Created: Math.floor(Date.now()/1000),
    });
    newAppApi.save()
      .then(function (appApi) {
        res.setHeader('Location', `/app/${appId}/api/${appApi.get("Id")}`);
        res.sendStatus(303);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

};
