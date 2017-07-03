const TEST_API_PORT = 9999;
const DatastudioApi = require("../../");

describe("A HTTP API", function () {

  describe("SIGNUP", function () {

    let api;
    let urlBase;

    let $testClient;


    beforeEach(function () {
      api = DatastudioApi(TEST_API_PORT);
      $testClient = jasmine.createTestClient(TEST_API_PORT);
    });

    afterEach(function (done) {
      api.server.close(done);
    });

    it("SHOULD RETURN `HTTP/1.1 202 Accepted` ON SUCCESS", function (done) {
      let d = {
        Email: "test-" + Date.now() + "@localhost",
        NewPassword: "$t3$71Ng1-2_E",
      };
      $testClient.$post(null, "/signups", d, function (err, res) {
        expect(res.statusCode).toBe(202);
        done();
      });
    });

    it("SHOULD RETURN `HTTP/1.1 400 Bad Request` IF THE EMAIL IS RESTRICTED", function (done) {
      let d = {
        Email: "admin",
        NewPassword: "$t3$71Ng1-2_E",
      };
      $testClient.$post(null, "/signups", d, function (err, res) {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

  });

});
