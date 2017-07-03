

module.exports = function TokenDb (db) {

  const bookshelf = db._bookshelf;

  let Token = bookshelf.Model.extend({
    tableName: 'tokens',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    User: function() {
      return this.hasOne(db.User, "Id", "UserId");
    },
  });

  db.Token = Token;

  function fetchTokenByKey (key) {
    return new Promise((resolve, reject) => {
      Token.where({"Key": key})
        .fetch({withRelated: ["User"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchTokenByKey = fetchTokenByKey;

  function fetchTokenById (id) {
    return new Promise((resolve, reject) => {
      Token.where({"Id": id})
        .fetch({withRelated: ["User"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchTokenById = fetchTokenById;

};
