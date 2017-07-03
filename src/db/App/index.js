

module.exports = function AppDb (db) {

  const bookshelf = db._bookshelf;

  let AppSchema = bookshelf.Model.extend({
    tableName: 'app_schemas',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    App: function() {
      return this.belongsTo(db.App, "AppId", "Id");
    },
  });

  db.AppSchema = AppSchema;

  let AppApi = bookshelf.Model.extend({
    tableName: 'app_apis',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    App: function() {
      return this.belongsTo(db.App, "AppId", "Id");
    },
  });

  db.AppApi = AppApi;

  let AppClient = bookshelf.Model.extend({
    tableName: 'app_clients',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    App: function() {
      return this.belongsTo(db.App, "AppId", "Id");
    },
  });

  db.AppClient = AppClient;

  let App = bookshelf.Model.extend({
    tableName: 'apps',
    idAttribute: "Id",
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    User: function() {
      return this.belongsTo(db.User, "UserId", "Id");
    },
    Schemas: function() {
      return this.hasMany(db.AppSchema, "AppId");
    },
    Clients: function() {
      return this.hasMany(db.AppClient, "AppId");
    },
    Apis: function() {
      return this.hasMany(db.AppApi, "AppId");
    },
  });

  db.App = App;

  function fetchAppApiById (id) {
    return new Promise((resolve, reject) => {
      AppApi.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppApiById = fetchAppApiById;

  function fetchAppClientById (id) {
    return new Promise((resolve, reject) => {
      AppClient.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppClientById = fetchAppClientById;

  function fetchAppSchemaById (id) {
    return new Promise((resolve, reject) => {
      AppSchema.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppSchemaById = fetchAppSchemaById;

  function fetchAppSchemasByAppId (appId) {
    return new Promise((resolve, reject) => {
      AppSchema.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppSchemasByAppId = fetchAppSchemasByAppId;

  function fetchAppClientsByAppId (appId) {
    return new Promise((resolve, reject) => {
      AppClient.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppClientsByAppId = fetchAppClientsByAppId;

  function fetchAppApisByAppId (appId) {
    return new Promise((resolve, reject) => {
      AppApi.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppApisByAppId = fetchAppApisByAppId;

  function fetchAppById (id) {
    return new Promise((resolve, reject) => {
      App.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppById = fetchAppById;

  function fetchDetailedAppById (id) {
    return new Promise((resolve, reject) => {
      App.where({"Id": id})
        .fetch({withRelated: ["Apis", "Clients", "Schemas"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchDetailedAppById = fetchDetailedAppById;

  function fetchAppsByUserId (userId) {
    return new Promise((resolve, reject) => {
      App.where({"UserId": userId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchAppsByUserId = fetchAppsByUserId;

};
