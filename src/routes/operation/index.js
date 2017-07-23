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

  api.get("/operation/:operationId", requireAuthorization, function (req, res) {
    if (null === req.operationModel) {
      return res.sendStatus(404);
    }
    res.sendStatus(200).send(req.operationModel);
  });

  api.put("/operation/:operationId", requireAuthorization, function (req, res) {
    if (null === req.operationModel) {
      return res.sendStatus(404);
    }
    res.sendStatus(200).send(req.operationModel);
  });

  api.delete("/operation/:operationId", requireAuthorization, function (req, res) {
    if (null === req.operationModel) {
      return res.sendStatus(404);
    }
    res.sendStatus(204).send("");
  });

  api.get("/operations", requireAuthorization, function (req, res) {
    res.sendStatus(200).send([]);
  });

  api.post("/operations", requireAuthorization, function (req, res) {
    let Operation = db.Operation;
    let newApiOperationId = v4uuid();
    let newApiOperation = new Operation({
      Id: newApiOperationId,
      ApiId: req.body.ApiId,
      Name: req.body.Name || "defaultOperation",
      Created: Math.floor(Date.now()/1000),
    });
    newApiOperation.save()
      .then(function (op) {
        res.localRedirect(`/api/${req.body.ApiId}/operation/${op.get("Id")}`);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

};
