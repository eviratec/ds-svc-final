

module.exports = function HashDb (db) {

  const bookshelf = db._bookshelf;

  let Hash = bookshelf.Model.extend({
    tableName: 'hashes',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
  });

  db.Hash = Hash;

  function fetchHashByOwnerId (ownerId) {
    return new Promise((resolve, reject) => {
      Hash.where({"OwnerId": ownerId})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchHashByOwnerId = fetchHashByOwnerId;

};
