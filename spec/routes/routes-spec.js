
const Routes = require("../../src/routes");

describe("API ROUTE", function () {

  let spyGet;
  let spyPost;
  let spyPut;
  let spyDel;
  let dataStudioMock;
  let routes;

  beforeEach(function () {

    spyGet = jasmine.createSpy("get");
    spyPost = jasmine.createSpy("post");
    spyPut = jasmine.createSpy("put");
    spyDel = jasmine.createSpy("delete");

    dataStudioMock = {
      expressApp: {
        get: spyGet,
        post: spyPost,
        put: spyPut,
        del: spyDel,
      },
      db: {

      },
    };

    routes = Routes(dataStudioMock);

  });

  describe("DEFINITIONS", function () {

    describe("FOR USERS", function () {

      it("[ GET   ] /user/:userId", function () {
        expect(spyGet).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ PUT   ] /user/:userId", function () {
        expect(spyPut).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET   ] /login/:login/availability", function () {
        expect(spyGet).toHaveBeenCalledWith("/login/:login/availability", jasmine.any(Function));
      });

    });

    describe("FOR SIGNUPS", function () {

      it("[ GET   ] /signup/:signupId", function () {
        expect(spyGet).toHaveBeenCalledWith("/signup/:signupId", jasmine.any(Function));
      });

      it("[ POST  ] /signups", function () {
        expect(spyPost).toHaveBeenCalledWith("/signups", jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("FOR AUTH", function () {

      it("[ POST  ] /auth/attempts", function () {
        expect(spyPost).toHaveBeenCalledWith("/auth/attempts", jasmine.any(Function));
      });

      it("[ GET   ] /auth/attempt/:authAttemptId", function () {
        expect(spyGet).toHaveBeenCalledWith("/auth/attempt/:authAttemptId", jasmine.any(Function));
      });

    });

    describe("FOR APPS", function () {

      it("[ POST   ] /apps", function () {
        expect(spyPost).toHaveBeenCalledWith("/apps", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET    ] /apps/all", function () {
        expect(spyGet).toHaveBeenCalledWith("/apps/all", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET    ] /app/:appId", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET    ] /app/:appId/schemas", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ POST   ] /app/:appId/schemas", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET    ] /app/:appId/apis", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ POST   ] /app/:appId/apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ GET    ] /app/:appId/clients", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ POST   ] /app/:appId/clients", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ PUT    ] /app/:appId", function () {
        expect(spyPut).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ DELETE ] /app/:appId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("[ DELETE ] /app/:appId/schema/:appSchemaId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId/schema/:appSchemaId", jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("FOR APIS", function () {

      it("[ POST   ] /apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/apis", jasmine.any(Function));
      });

      it("[ GET    ] /api/:apiId", function () {
        expect(spyGet).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("[ PUT    ] /api/:apiId", function () {
        expect(spyPut).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("[ DELETE ] /api/:apiId", function () {
        expect(spyDel).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

    });

  });

});
