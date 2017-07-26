

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
      return this.hasOne(db.ResourceOwner, "ResourceId", "Id");
    },
  });

  db.Resource = Resource;

  function fetchResourceById (id) {
    return new Promise((resolve, reject) => {
      Resource.where({"Id": id})
        .fetch({withRelated: ["Owner"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchResourceById = fetchResourceById;

  function fetchResourceByUri (uri) {
    return new Promise((resolve, reject) => {
      Resource.where({"Uri": uri})
        .fetchAll({withRelated: ["Owner"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchResourceByUri = fetchResourceByUri;

};
