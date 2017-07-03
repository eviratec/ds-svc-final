
const Db = require("../../src/db");

describe("db", function () {

  let db;

  beforeEach(function () {
    db = Db();
  });

  describe("models", function () {

    it("should include 'Api'", function () {
      expect('Api' in db).toBe(true);
    });

    it("should include 'AppClient'", function () {
      expect('AppClient' in db).toBe(true);
    });

    it("should include 'App'", function () {
      expect('App' in db).toBe(true);
    });

    it("should include 'AppSchema'", function () {
      expect('AppSchema' in db).toBe(true);
    });

    it("should include 'AuthAttempt'", function () {
      expect('AuthAttempt' in db).toBe(true);
    });

    it("should include 'Operation'", function () {
      expect('Operation' in db).toBe(true);
    });

    it("should include 'OperationParameter'", function () {
      expect('OperationParameter' in db).toBe(true);
    });

    it("should include 'Route'", function () {
      expect('Route' in db).toBe(true);
    });

    it("should include 'Hash'", function () {
      expect('Hash' in db).toBe(true);
    });

    it("should include 'Token'", function () {
      expect('Token' in db).toBe(true);
    });

    it("should include 'User'", function () {
      expect('User' in db).toBe(true);
    });

  });

});
