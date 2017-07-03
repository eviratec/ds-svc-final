"use strict";

const v4uuid = require("uuid/v4");

function requireAuthorization (req, res, next) {
  if (!req.authorized) {
    return res.sendStatus(403);
  }
  next();
}

module.exports = function (api, db) {

  api.get("/app/:appId", requireAuthorization, function (req, res) {
    if (null === req.app) {
      return res.sendStatus(404);
    }
    res.status(200).send(req.app);
  });

  api.put("/app/:appId", requireAuthorization, function (req, res) {
    return res.sendStatus(404);
  });

  api.get("/apps/all", requireAuthorization, function (req, res) {
    db.fetchAppsByUserId(req.authUser.get("Id"))
      .then(function (apps) {
        res.status(200).send(apps);
      })
      .catch(function (err) {
        res.status(500).send({ ErrorMsg: err.message });
      });
  });

  api.post("/apps", requireAuthorization, function (req, res) {
    let App = db.App;
    let newAppId = v4uuid();
    let newApp = {
      Id: newAppId,
      UserId: req.authUser.get("Id"),
      Name: req.body.Name || "Un-named App",
      Created: Math.floor(Date.now()/1000),
    };
    App.forge(newApp)
      .save(null, {method:"insert"})
      .then(function (app) {
        res.setHeader('Location', `/app/${newAppId}`);
        res.sendStatus(303);
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

  api.get("/app/:appId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    db.fetchDetailedAppById(req.appModel.get("Id"))
      .then(function (app) {
        res.status(200).send(app);
      })
      .catch(function (err) {
        res.status(400).send({
          Error: err.message,
        });
      });
  });

  api.delete("/app/:appId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    req.appModel.save({"Deleted": Math.floor(Date.now()/1000)}, {patch: true})
      .then(function () {
        res.sendStatus(204);
      })
      .catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });

  });


  [
    {id: "schemas", fetch: "fetchAppSchemasByAppId"},
    {id: "apis", fetch: "fetchAppApisByAppId"},
    {id: "clients", fetch: "fetchAppClientsByAppId"},
  ].forEach(x => {

    let tId = x.id;
    let tFn = x.fetch;

    api.get(`/app/:appId/${tId}`, requireAuthorization, function (req, res) {
      if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
        return res.sendStatus(403);
      }
      db[tFn](req.appModel.get("Id"))
        .then(function (schemas) {
          res.status(200).send(schemas);
        })
        .catch(function (err) {
          res.status(500).send({ ErrorMsg: err.message });
        });
    });

  });

  api.post("/app/:appId/apis", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    let AppApi = db.AppApi;
    let appId = req.appModel.get("Id");
    let newAppApiId = v4uuid();
    let newAppApi = new AppApi({
      Id: newAppApiId,
      AppId: appId,
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

  api.post("/app/:appId/clients", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    let AppClient = db.AppClient;
    let appId = req.appModel.get("Id");
    let newAppClientId = v4uuid();
    let newAppClient = new AppClient({
      Id: newAppClientId,
      AppId: appId,
      Name: req.body.Name || "NewClient",
      Created: Math.floor(Date.now()/1000),
    });
    newAppClient.save()
      .then(function (appClient) {
        res.setHeader('Location', `/app/${appId}/client/${appClient.get("Id")}`);
        res.sendStatus(303);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

  api.post("/app/:appId/schemas", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    let AppSchema = db.AppSchema;
    let appId = req.appModel.get("Id");
    let newAppSchemaId = v4uuid();
    let newAppSchema = new AppSchema({
      Id: newAppSchemaId,
      AppId: appId,
      Name: req.body.Name || "NewSchema",
      Ref: req.body.Ref || "#" + req.body.Name,
      Created: Math.floor(Date.now()/1000),
    });
    newAppSchema.save()
      .then(function (appSchema) {
        res.setHeader('Location', `/app/${appId}/schema/${appSchema.get("Id")}`);
        res.sendStatus(303);
      })
      .catch(function (err) {
        res.status(400).send({ ErrorMsg: err.message });
      });
  });

  api.delete("/app/:appId/schema/:schemaId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    if (req.appSchemaModel.get("AppId") !== req.appModel.get("Id")) {
      return res.sendStatus(400);
    }
    req.appSchemaModel.save({"Deleted": Math.floor(Date.now()/1000)}, {patch: true})
      .then(function () {
        res.sendStatus(204);
      })
      .catch(function (err) {
        console.log(err);
        res.sendStatus(500);
      });

  });

  api.get("/app/:appId/api/:appApiId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    if (req.appApiModel.get("AppId") !== req.appModel.get("Id")) {
      return res.sendStatus(400);
    }
    res.status(200).send(req.appApiModel);
  });

  api.get("/app/:appId/client/:appClientId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    if (req.appClientModel.get("AppId") !== req.appModel.get("Id")) {
      return res.sendStatus(400);
    }
    res.status(200).send(req.appClientModel);
  });

  api.get("/app/:appId/schema/:appSchemaId", requireAuthorization, function (req, res) {
    if (req.appModel.get("UserId") !== req.authUser.get("Id")) {
      return res.sendStatus(403);
    }
    if (req.appSchemaModel.get("AppId") !== req.appModel.get("Id")) {
      return res.sendStatus(400);
    }
    res.status(200).send(req.appSchemaModel);
  });

};
