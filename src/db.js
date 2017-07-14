"use strict";

module.exports = function () {

  const DBS = [
    "Api",
    "App",
    "Auth",
    "Client",
    "Hash",
    "Operation",
    "Route",
    "Schema",
    "Token",
    "User",
  ];

  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DS_DB_HOST,
      user: process.env.DS_DB_USER,
      password: process.env.DS_DB_PASS,
      database: process.env.DS_DB_NAME,
      charset: 'utf8',
    },
  });

  const bookshelf = require('bookshelf')(knex);

  const db = {};

  Object.defineProperties(db, {
    _knex: {
      value: knex,
    },
    _bookshelf: {
      value: bookshelf,
    },
  });

  DBS.forEach(t => {
    require(`./db/${t}`)(db);
  });

  return db;

};
