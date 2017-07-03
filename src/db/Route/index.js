

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
    Operations: function() {
      return this.hasMany(db.Operation, "ApiRouteId", "Id");
    },
  });

  db.Route = Route;

};
