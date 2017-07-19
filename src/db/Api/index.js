

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
      return this.hasMany(db.Route, "ApiId", "Id");
    },
    Operations: function() {
      return this.hasMany(db.Operation, "ApiId", "Id");
    },
  });

  db.Api = Api;

  function fetchDetailedApiById (id) {
    return new Promise((resolve, reject) => {
      Api.where({"Id": id, "Deleted": null})
        .fetch({withRelated: ["App", "Operations", "Routes"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchDetailedApiById = fetchDetailedApiById;

  function fetchApiById (id) {
    return new Promise((resolve, reject) => {
      Api.where({"Id": id, "Deleted": null})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchApiById = fetchApiById;

  function fetchApisByAppId (appId) {
    return new Promise((resolve, reject) => {
      Api.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchApisByAppId = fetchApisByAppId;

};
