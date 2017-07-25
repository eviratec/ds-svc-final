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

  api.get("/schema/:schemaId", requireAuthorization, function (req, res) {
    if (null === req.schemaModel) {
      return res.send(404);
    }
    res.send(200, req.schemaModel);
  });

  api.put("/schema/:schemaId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.delete("/schema/:schemaId", requireAuthorization, function (req, res) {
    res.send(404);
  });

  api.get("/schemas", requireAuthorization, function (req, res) {

  });

  api.post("/schemas", requireAuthorization, function (req, res) {
    let Schema = db.Schema;
    let newAppSchemaId = v4uuid();
    let newAppSchema = new Schema({
      Id: newAppSchemaId,
      AppId: req.body.AppId,
      Name: req.body.Name || "NewSchema",
      Created: Math.floor(Date.now()/1000),
    });
    newAppSchema.save()
      .then(function (schema) {
        res.localRedirect(`/app/${req.body.AppId}/schema/${schema.get("Id")}`);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

};
