
const Routes = require("../../src/routes");

describe("routes", function () {

  let spyGet;
  let spyPost;
  let dataStudioMock;
  let routes;

  beforeEach(function () {

    spyGet = jasmine.createSpy("get");
    spyPost = jasmine.createSpy("post");

    dataStudioMock = {
      expressApp: {
        get: spyGet,
        post: spyPost,
      },
      db: {

      },
    };

    routes = Routes(dataStudioMock);

  });

  describe("route definitions", function () {

    describe("users", function () {
      it("should define GET /user/:userId", function () {
        expect(spyGet).toHaveBeenCalledWith("/user/:userId", jasmine.any(Function));
      });
    })

  });

});
