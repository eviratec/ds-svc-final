
const Db = require("../../src/db");

describe("DATABASE", function () {

  let db;

  beforeEach(function () {
    db = Db();
  });

  describe("MODELS", function () {

    it("Api", function () {
      expect('Api' in db).toBe(true);
    });

    it("AppClient", function () {
      expect('AppClient' in db).toBe(true);
    });

    it("App", function () {
      expect('App' in db).toBe(true);
    });

    it("AppSchema", function () {
      expect('AppSchema' in db).toBe(true);
    });

    it("AuthAttempt", function () {
      expect('AuthAttempt' in db).toBe(true);
    });

    it("Operation", function () {
      expect('Operation' in db).toBe(true);
    });

    it("OperationParameter", function () {
      expect('OperationParameter' in db).toBe(true);
    });

    it("Route", function () {
      expect('Route' in db).toBe(true);
    });

    it("Hash", function () {
      expect('Hash' in db).toBe(true);
    });

    it("Token", function () {
      expect('Token' in db).toBe(true);
    });

    it("User", function () {
      expect('User' in db).toBe(true);
    });

  });

  describe("SUGAR METHODS", function () {

    describe("FOR APIS", function () {

      it("fetchApiById", function () {
        expect('fetchApiById' in db).toBe(true);
      });

      it("fetchApisByAppId", function () {
        expect('fetchApisByAppId' in db).toBe(true);
      });

    });

    describe("FOR APPS", function () {

      it("fetchAppById", function () {
        expect('fetchAppById' in db).toBe(true);
      });

      it("fetchAppClientById", function () {
        expect('fetchAppClientById' in db).toBe(true);
      });

      it("fetchAppSchemaById", function () {
        expect('fetchAppSchemaById' in db).toBe(true);
      });

    });

    describe("FOR USERS", function () {

      it("fetchUserById", function () {
        expect('fetchUserById' in db).toBe(true);
      });

      it("fetchUserByLogin", function () {
        expect('fetchUserByLogin' in db).toBe(true);
      });

      it("fetchAuthAttemptById", function () {
        expect('fetchAuthAttemptById' in db).toBe(true);
      });

      it("fetchHashByOwnerId", function () {
        expect('fetchHashByOwnerId' in db).toBe(true);
      });

    });

    describe("FOR TOKENS", function () {

      it("fetchTokenById", function () {
        expect('fetchTokenById' in db).toBe(true);
      });

      it("fetchTokenByKey", function () {
        expect('fetchTokenByKey' in db).toBe(true);
      });

    });

    describe("FOR OPERATIONS", function () {

      it("fetchOperationById", function () {
        expect('fetchOperationById' in db).toBe(true);
      });

      it("fetchOperationsByApiId", function () {
        expect('fetchOperationsByApiId' in db).toBe(true);
      });

      it("fetchOperationParameterById", function () {
        expect('fetchOperationParameterById' in db).toBe(true);
      });

    });

  });

});
