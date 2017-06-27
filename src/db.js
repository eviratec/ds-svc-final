"use strict";

module.exports = function (dataStudio) {

  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'datastudio',
      charset: 'utf8'
    }
  });

  const bookshelf = require('bookshelf')(knex);

  var Hash = bookshelf.Model.extend({
    tableName: 'hashes',
  });

  var User = bookshelf.Model.extend({
    tableName: 'users',
  });

  var Token = bookshelf.Model.extend({
    tableName: 'tokens'
  });

  var AuthAttempt = bookshelf.Model.extend({
    tableName: 'auth_attempts',
    Token: function() {
      return this.hasOne(Token);
    },
  });

  return {
    _knex: knex,
    _bookshelf: bookshelf,
    User: User,
    Token: Token,
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
    fetchAuthAttemptById: function (id) {
      return new Promise((resolve, reject) => {
        AuthAttempt.where("Id", id)
          .fetch({withRelated: ["Token"]})
          .then(resolve)
          .catch(reject);
      });
    },
    fetchTokenById: function (id) {
      return new Promise((resolve, reject) => {
        Token.where("Id", id)
          .fetch()
          .then(resolve)
          .catch(reject);
      });
    },
  };

};
