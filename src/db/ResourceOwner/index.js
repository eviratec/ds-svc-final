

module.exports = function ResourceOwnerDb (db) {

  const bookshelf = db._bookshelf;

  let ResourceOwner = bookshelf.Model.extend({
    tableName: 'resource_owners',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Resource: function() {
      return this.belongsTo(db.Resource, "ResourceId", "Id");
    },
  });

  db.ResourceOwner = ResourceOwner;

  function fetchResourceOwnerById (id) {
    return new Promise((resolve, reject) => {
      ResourceOwner.where({"Id": id})
        .fetch({withRelated: ["Resource"]})
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchResourceOwnerById = fetchResourceOwnerById;

};
