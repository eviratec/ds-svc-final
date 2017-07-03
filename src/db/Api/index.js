

module.exports = function ApiDb (db) {

  const bookshelf = db._bookshelf;

  let ApiOperation = bookshelf.Model.extend({
    tableName: 'api_operations',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Api: function() {
      return this.belongsTo(db.AppApi, "ApiId", "Id");
    },
    Route: function() {
      return this.belongsTo(db.ApiRoute, "ApiRouteId", "Id");
    },
    Parameters: function() {
      return this.hasMany(db.OperationParameter, "OperationId");
    },
  });

  db.ApiOperation = ApiOperation;

  function fetchApiOperationById (id) {
    return new Promise((resolve, reject) => {
      ApiOperation.where({"Id": id})
        .fetch({withRelated: ["Parameters"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchApiOperationById = fetchApiOperationById;

  function fetchApiOperationsByApiId (apiId) {
    return new Promise((resolve, reject) => {
      ApiOperation.where({"ApiId": apiId})
        .fetchAll({withRelated: ["Parameters"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchApiOperationById = fetchApiOperationById;

};
