

module.exports = function OperationDb (db) {

  const bookshelf = db._bookshelf;

  let Route = bookshelf.Model.extend({
    tableName: 'api_routes',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Api: function() {
      return this.belongsTo(db.Api, "ApiId", "Id");
    },
  });

  db.Route = Route;

  function fetchRouteById (id) {
    return new Promise((resolve, reject) => {
      Route.where({"Id": id, "Deleted": null})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchRouteById = fetchRouteById;

  function fetchRoutesByApiId (apiId) {
    return new Promise((resolve, reject) => {
      Route.where({"ApiId": apiId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchRoutesByApiId = fetchRoutesByApiId;

};
