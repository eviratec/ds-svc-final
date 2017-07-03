
const Routes = require("../../src/routes");

describe("routes", function () {

  let spyGet;
  let spyPost;
  let spyPut;
  let spyDelete;
  let dataStudioMock;
  let routes;

  beforeEach(function () {

    spyGet = jasmine.createSpy("get");
    spyPost = jasmine.createSpy("post");
    spyPut = jasmine.createSpy("put");
    spyDelete = jasmine.createSpy("delete");

    dataStudioMock = {
      expressApp: {
        get: spyGet,
        post: spyPost,
        put: spyPut,
        delete: spyDelete,
      },
      db: {

      },
    };

    routes = Routes(dataStudioMock);

  });

  describe("route definitions", function () {

    describe("users", function () {

      it("MUST define: [GET   ] /user/:userId", function () {
        expect(spyGet).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function));
      });

      it("MUST define: [PUT   ] /user/:userId", function () {
        expect(spyPut).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function));
      });

    });

    describe("apps", function () {

      it("MUST define: [POST  ] /apps", function () {
        expect(spyPost).toHaveBeenCalledWith("/apps", jasmine.any(Function));
      });

      it("MUST define: [GET   ] /apps/all", function () {
        expect(spyGet).toHaveBeenCalledWith("/apps/all", jasmine.any(Function));
      });

      it("MUST define: [GET   ] /app/:appId", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function));
      });

      it("MUST define: [PUT   ] /app/:appId", function () {
        expect(spyPut).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function));
      });

      it("MUST define: [DELETE] /app/:appId", function () {
        expect(spyDelete).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function));
      });

    });

    describe("apis", function () {

      it("MUST define: [POST  ] /apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/apis", jasmine.any(Function));
      });

      it("MUST define: [GET   ] /app/:appId/apis", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function));
      });

      it("MUST define: [GET   ] /api/:apiId", function () {
        expect(spyGet).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("MUST define: [PUT   ] /api/:apiId", function () {
        expect(spyPut).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it("MUST define: [DELETE] /api/:apiId", function () {
        expect(spyDelete).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

    });

  });

});
