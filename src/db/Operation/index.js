

module.exports = function OperationDb (db) {

  const bookshelf = db._bookshelf;

  let Operation = bookshelf.Model.extend({
    tableName: 'api_operations',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Api: function() {
      return this.belongsTo(db.Api, "ApiId", "Id");
    },
    Route: function() {
      return this.belongsTo(db.Route, "ApiRouteId", "Id");
    },
    Parameters: function() {
      return this.hasMany(db.OperationParameter, "OperationId");
    },
  });

  db.Operation = Operation;

  let OperationParameter = bookshelf.Model.extend({
    tableName: 'operation_parameter',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Operation: function() {
      return this.belongsTo(db.Operation, "OperationId", "Id");
    },
  });

  db.OperationParameter = OperationParameter;

  function fetchOperationById (id) {
    return new Promise((resolve, reject) => {
      Operation.where({"Id": id})
        .fetch({withRelated: ["Parameters"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchOperationById = fetchOperationById;

  function fetchOperationsByApiId (apiId) {
    return new Promise((resolve, reject) => {
      Operation.where({"ApiId": apiId})
        .fetchAll({withRelated: ["Parameters"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchOperationsByApiId = fetchOperationsByApiId;

  function fetchOperationParameterById (id) {
    return new Promise((resolve, reject) => {
      OperationParameter.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchOperationParameterById = fetchOperationParameterById;

};
