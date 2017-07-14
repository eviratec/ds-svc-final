

module.exports = function ApiDb (db) {

  const bookshelf = db._bookshelf;

  let Client = bookshelf.Model.extend({
    tableName: 'app_clients',
    constructor: function() {
      bookshelf.Model.apply(this, arguments);
      this.on('saving', function(model, attrs, options) {
        options.query.where('Id', '=', model.get("Id"));
      });
    },
    App: function() {
      return this.belongsTo(db.App, "AppId", "Id");
    },
  });

  db.Client = Client;

  function fetchClientById (id) {
    return new Promise((resolve, reject) => {
      Client.where({"Id": id})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  };

  db.fetchClientById = fetchClientById;

  function fetchClientsByAppId (appId) {
    return new Promise((resolve, reject) => {
      Client.where({"AppId": appId, "Deleted": null})
        .fetchAll()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchClientsByAppId = fetchClientsByAppId;

  function fetchClientById (id) {
    return new Promise((resolve, reject) => {
      Client.where({"Id": id, "Deleted": null})
        .fetch()
        .then(resolve)
        .catch(reject);
    });
  }

  db.fetchClientById = fetchClientById;

};
