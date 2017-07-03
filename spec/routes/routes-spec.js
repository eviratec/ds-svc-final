
const Routes = require("../../src/routes");

describe("API ROUTE", function () {

  const _GET_ = "[ GET    ]";
  const _POST_ = "[ POST   ]";
  const _PUT_ = "[ PUT    ]";
  const _DELETE_ = "[ DELETE ]";

  const _USER_ = "/user/:userId";
  const _LOGIN_AVAILABILITY_ = "/login/:login/availability";
  const _SIGNUP_ = "/signup/:signupId";
  const _SIGNUPS_ = "/signups";

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

      it(`${_GET_} ${_USER_}`, function () {
        expect(spyGet).toHaveBeenCalledWith(_USER_, jasmine.any(Function), jasmine.any(Function));
      });

      it(`${_PUT_} ${_USER_}`, function () {
        expect(spyPut).toHaveBeenCalledWith(_USER_, jasmine.any(Function), jasmine.any(Function));
      });

      it(`${_GET_} ${_LOGIN_AVAILABILITY_}`, function () {
        expect(spyGet).toHaveBeenCalledWith(_LOGIN_AVAILABILITY_, jasmine.any(Function));
      });

    });

    describe("FOR SIGNUPS", function () {

      it(`${_GET_} ${_SIGNUP_}`, function () {
        expect(spyGet).toHaveBeenCalledWith(_SIGNUP_, jasmine.any(Function));
      });

      it(`${_GET_} ${_SIGNUPS_}`, function () {
        expect(spyPost).toHaveBeenCalledWith(_SIGNUPS_, jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("FOR AUTH", function () {

      it(_POST_ + " /auth/attempts", function () {
        expect(spyPost).toHaveBeenCalledWith("/auth/attempts", jasmine.any(Function));
      });

      it(_GET_ + " /auth/attempt/:authAttemptId", function () {
        expect(spyGet).toHaveBeenCalledWith("/auth/attempt/:authAttemptId", jasmine.any(Function));
      });

    });

    describe("FOR APPS", function () {

      it(_POST_ + " /apps", function () {
        expect(spyPost).toHaveBeenCalledWith("/apps", jasmine.any(Function), jasmine.any(Function));
      });

      it(_GET_ + " /apps/all", function () {
        expect(spyGet).toHaveBeenCalledWith("/apps/all", jasmine.any(Function), jasmine.any(Function));
      });

      it(_GET_ + " /app/:appId", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it(_GET_ + " /app/:appId/schemas", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it(_POST_ + " /app/:appId/schemas", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/schemas", jasmine.any(Function), jasmine.any(Function));
      });

      it(_GET_ + " /app/:appId/apis", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it(_POST_ + " /app/:appId/apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/apis", jasmine.any(Function), jasmine.any(Function));
      });

      it(_GET_ + " /app/:appId/clients", function () {
        expect(spyGet).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it(_POST_ + " /app/:appId/clients", function () {
        expect(spyPost).toHaveBeenCalledWith("/app/:appId/clients", jasmine.any(Function), jasmine.any(Function));
      });

      it(_PUT_ + " /app/:appId", function () {
        expect(spyPut).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it(_DELETE_ + " /app/:appId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId", jasmine.any(Function), jasmine.any(Function));
      });

      it(_DELETE_ + " /app/:appId/schema/:appSchemaId", function () {
        expect(spyDel).toHaveBeenCalledWith("/app/:appId/schema/:appSchemaId", jasmine.any(Function), jasmine.any(Function));
      });

    });

    describe("FOR APIS", function () {

      it(_POST_ + " /apis", function () {
        expect(spyPost).toHaveBeenCalledWith("/apis", jasmine.any(Function));
      });

      it(_GET_ + " /api/:apiId", function () {
        expect(spyGet).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it(_PUT_ + " /api/:apiId", function () {
        expect(spyPut).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

      it(_DELETE_ + " /api/:apiId", function () {
        expect(spyDel).toHaveBeenCalledWith("/api/:apiId", jasmine.any(Function));
      });

    });

  });

});
