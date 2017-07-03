

module.exports = function AuthDb (db) {

  const bookshelf = db._bookshelf;

  let AuthAttempt = bookshelf.Model.extend({
    tableName: 'auth_attempts',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    Token: function() {
      return this.hasOne(db.Token, "Id", "TokenId");
    },
  });

  db.AuthAttempt = AuthAttempt;

  function fetchAuthAttemptById (id) {
    return new Promise((resolve, reject) => {
      AuthAttempt.where({"Id": id})
        .fetch({withRelated: ["Token"]})
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchAuthAttemptById = fetchAuthAttemptById;

};
