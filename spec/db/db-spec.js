
const Db = require("../../src/db");

describe("Database", function () {

  let db;

  beforeEach(function () {
    db = Db();
  });

  describe("models", function () {

    it("MUST define <Api>", function () {
      expect('Api' in db).toBe(true);
    });

    it("MUST define <AppClient>", function () {
      expect('AppClient' in db).toBe(true);
    });

    it("MUST define <App>", function () {
      expect('App' in db).toBe(true);
    });

    it("MUST define <AppSchema>", function () {
      expect('AppSchema' in db).toBe(true);
    });

    it("MUST define <AuthAttempt>", function () {
      expect('AuthAttempt' in db).toBe(true);
    });

    it("MUST define <Operation>", function () {
      expect('Operation' in db).toBe(true);
    });

    it("MUST define <OperationParameter>", function () {
      expect('OperationParameter' in db).toBe(true);
    });

    it("MUST define <Route>", function () {
      expect('Route' in db).toBe(true);
    });

    it("MUST define <Hash>", function () {
      expect('Hash' in db).toBe(true);
    });

    it("MUST define <Token>", function () {
      expect('Token' in db).toBe(true);
    });

    it("MUST define <User>", function () {
      expect('User' in db).toBe(true);
    });

  });

  describe("functions", function () {

    describe("(apis)", function () {

      it("MUST include 'fetchApisByAppId'", function () {
        expect('fetchApisByAppId' in db).toBe(true);
      });

    });

    describe("(apps)", function () {

      it("MUST include 'fetchAppById'", function () {
        expect('fetchAppById' in db).toBe(true);
      });

    });

    describe("(users)", function () {

      it("MUST include 'fetchUserById'", function () {
        expect('fetchUserById' in db).toBe(true);
      });

      it("MUST include 'fetchUserByLogin'", function () {
        expect('fetchUserByLogin' in db).toBe(true);
      });

    });

    describe("(tokens)", function () {

      it("MUST include 'fetchTokenById'", function () {
        expect('fetchTokenById' in db).toBe(true);
      });

      it("MUST include 'fetchTokenByKey'", function () {
        expect('fetchTokenByKey' in db).toBe(true);
      });

    });

    describe("(operations)", function () {

      it("MUST include 'fetchOperationById'", function () {
        expect('fetchOperationById' in db).toBe(true);
      });

      it("MUST include 'fetchOperationsByApiId'", function () {
        expect('fetchOperationsByApiId' in db).toBe(true);
      });

      it("MUST include 'fetchOperationParameterById'", function () {
        expect('fetchOperationParameterById' in db).toBe(true);
      });

    });

  });

});
