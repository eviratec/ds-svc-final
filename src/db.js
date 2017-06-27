"use strict";

module.exports = function (dataStudio) {

  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'datastudio',
      charset: 'utf8',
    },
  });

  const bookshelf = require('bookshelf')(knex);

  var Hash = bookshelf.Model.extend({
    tableName: 'hashes',
  });

  var App = bookshelf.Model.extend({
    tableName: 'apps',
    User: function() {
      return this.belongsTo(bookshelf.Model("User"), "UserId", "Id");
    }
  });

  var User = bookshelf.Model.extend({
    tableName: 'users',
    Apps: function() {
      return this.hasMany(App, "Id", "UserId");
    },
  });

  var Token = bookshelf.Model.extend({
    tableName: 'tokens',
    User: function() {
      return this.hasOne(User, "Id", "UserId");
    },
  });

  var AuthAttempt = bookshelf.Model.extend({
    tableName: 'auth_attempts',
    Token: function() {
      return this.hasOne(Token, "Id", "TokenId");
    },
  });

  return {
    _knex: knex,
    _bookshelf: bookshelf,
    App: App,
    Hash: Hash,
    User: User,
    Token: Token,
    AuthAttempt: AuthAttempt,
    fetchUserById: function (id) {
      return new Promise((resolve, reject) => {
        User.where("Id", id)
          .fetch()
          .then(resolve)
          .catch(reject);
      });
    },
    fetchUserByLogin: function (login) {
      return new Promise((resolve, reject) => {
        User.where("Login", login.toLowerCase())
          .fetch()
          .then(resolve)
          .catch(reject);
      });
    },
    fetchHashByOwnerId: function (id) {
      return new Promise((resolve, reject) => {
        Hash.where("OwnerId", id)
          .fetch()
          .then(resolve)
          .catch(reject);
      });
    },
    fetchAppsByUserId: function (userId) {
      return new Promise((resolve, reject) => {
        App.where("UserId", userId)
          .fetchAll()
          .then(resolve)
          .catch(reject);
      });
    },
    fetchAuthAttemptById: function (id) {
      return new Promise((resolve, reject) => {
        AuthAttempt.where("Id", id)
          .fetch({withRelated: ["Token"]})
          .then(resolve)
          .catch(reject);
      });
    },
    fetchTokenByKey: function (key) {
      return new Promise((resolve, reject) => {
        Token.where("Key", key)
          .fetch({withRelated: ["User"]})
          // .fetch()
          .then(resolve)
          .catch(reject);
      });
    },
    fetchTokenById: function (id) {
      return new Promise((resolve, reject) => {
        Token.where("Id", id)
          .fetch({withRelated: ["User"]})
          .then(resolve)
          .catch(reject);
      });
    },
  };

};
