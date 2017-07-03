

module.exports = function ApiDb (db) {

  const bookshelf = db._bookshelf;

  let Api = bookshelf.Model.extend({
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
    Routes: function() {
      return this.hasMany(db.Route, "ApiId");
    },
    Operations: function() {
      return this.hasMany(db.Operation, "ApiId");
    },
  });

  db.Api = Api;

  function fetchApiById (id) {
    return new Promise((resolve, reject) => {
      Api.where({"Id": id})
        .fetch({withRelated: ["App", "Operations"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchApiById = fetchApiById;

  function fetchApisByAppId (appId) {
    return new Promise((resolve, reject) => {
      AppApi.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchApisByAppId = fetchApisByAppId;

  function fetchApiById (id) {
    return new Promise((resolve, reject) => {
      AppApi.where({"Id": id, "Deleted": null})
        .fetch({withRelated: ["Routes", "Operations"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchApiById = fetchApiById;

};