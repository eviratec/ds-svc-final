
const Routes = require("../../src/routes");

describe("routes", function () {

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

  describe("route definitions", function () {

    describe("users", function () {

      it("MUST define: [ GET   ] /user/:userId", function () {
        expect(spyGet).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ PUT   ] /user/:userId", function () {
        expect(spyPut).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET   ] /login/:login/availability", function () {
        expect(spyGet).toHaveBeenCalledWith("/login/:login/availability", jasmine.any(Function));
      });

    });

    describe("signups", function () {

      it("MUST define: [ GET   ] /signup/:signupId", function () {
        expect(spyGet).toHaveBeenCalledWith("/signup/:signupId", jasmine.any(Function));
      });

      it("MUST define: [ POST  ] /signups", function () {
        expect(spyPost).toHaveBeenCalledWith("/signups", jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("auth", function () {

      it("MUST define: [ POST  ] /auth/attempts", function () {
        expect(spyPost).toHaveBeenCalledWith("/auth/attempts", jasmine.any(Function));
      });

      it("MUST define: [ GET   ] /auth/attempt/:authAttemptId", function () {
        expect(spyGet).toHaveBeenCalledWith("/auth/attempt/:authAttemptId", jasmine.any(Function));
      });

    });

    describe("apps", function () {

      it("MUST define: [ POST   ] /apps", function () {
        expect(spyPost).toHaveBeenCalledWith("/apps", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /apps/all", function () {
        expect(spyGet).toHaveBeenCalledWith("/apps/all", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /app/:appId", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /app/:appId/schemas", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ POST   ] /app/:appId/schemas", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /app/:appId/apis", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ POST   ] /app/:appId/apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /app/:appId/clients", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ POST   ] /app/:appId/clients", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ PUT    ] /app/:appId", function () {
        expect(spyPut).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ DELETE ] /app/:appId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it("MUST define: [ DELETE ] /app/:appId/schema/:appSchemaId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId/schema/:appSchemaId", jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("apis", function () {

      it("MUST define: [ POST   ] /apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/apis", jasmine.any(Function));
      });

      it("MUST define: [ GET    ] /api/:apiId", function () {
        expect(spyGet).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("MUST define: [ PUT    ] /api/:apiId", function () {
        expect(spyPut).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("MUST define: [ DELETE ] /api/:apiId", function () {
        expect(spyDel).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

    });

  });

});
