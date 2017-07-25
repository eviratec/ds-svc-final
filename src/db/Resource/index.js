

module.exports = function ResourceDb (db) {

  const bookshelf = db._bookshelf;

  let Resource = bookshelf.Model.extend({
    tableName: 'resources',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Owner: function() {
      return this.belongsTo(db.ResourceOwner, "Id", "ResourceId");
    },
  });

  db.Resource = Resource;

  function fetchResourceById (id, opts) {
    opts = opts || {};
    return new Promise((resolve, reject) => {
      Resource.where({"Id": id})
        .fetch({withRelated: ["Owner"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchResourceById = fetchResourceById;

  function fetchResourceByUri (uri) {
    opts = opts || {};
    return new Promise((resolve, reject) => {
      Resource.where({"Uri": uri})
        .fetch({withRelated: ["Owner"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchResourceByUri = fetchResourceByUri;

};
