

module.exports = function OperationDb (db) {

  const bookshelf = db._bookshelf;

  let OperationParameter = bookshelf.Model.extend({
    tableName: 'operation_parameter',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Operation: function() {
      return this.belongsTo(db.ApiOperation, "OperationId", "Id");
    },
  });

  db.OperationParameter = OperationParameter;

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
