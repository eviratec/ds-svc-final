"use strict";

function requireAuthorization (req, res, next) {
  if (!req.authorized) {
    return res.send(403);
  }
  next();
}

module.exports = function (dataStudio) {

  const api = dataStudio.expressApp;
  const db = dataStudio.db;
  const events = dataStudio.events;

  api.get("/client/:clientId", requireAuthorization, function (req, res) {
    if (null === req.clientModel) {
      return res.send(404);
    }
    res.send(200, req.clientModel);
  });

  api.put("/client/:clientId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.delete("/client/:clientId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.get("/clients", requireAuthorization, function (req, res) {

  });

  api.post("/clients", requireAuthorization, function (req, res) {
    let Client = db.Client;
    let newAppClientId = v4uuid();
    let newAppClient = new Client({
      Id: newAppClientId,
      AppId: req.body.AppId,
      Name: req.body.Name || "NewClient",
      Created: Math.floor(Date.now()/1000),
    });
    newAppClient.save()
      .then(function (client) {
        res.setHeader('Location', `/app/${req.body.AppId}/client/${client.get("Id")}`);
        res.sendStatus(303);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

};
