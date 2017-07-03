
describe("SIGNUP REST API", function () {

  describe("[ POST   ] /signups", function () {

    let api;
    let urlBase;

    let $testClient;


    beforeEach(function () {
      api = jasmine.startTestApi();
      $testClient = jasmine.createTestClient();
    });

    afterEach(function (done) {
      api.server.close(done);
    });

    it("RETURNS `HTTP/1.1 202 Accepted` ON SUCCESS", function (done) {
      let d = {
        Email: "test-" + Date.now() + "@localhost",
        NewPassword: "$t3$71Ng1-2_E",
      };
      $testClient.$post(null, "/signups", d, function (err, res) {
        expect(res.statusCode).toBe(202);
        done();
      });
    });

    it("RETURNS `HTTP/1.1 400 Bad Request` WHEN THE EMAIL IS TAKEN", function (done) {
      let d = {
        Email: "test-" + Date.now() + "@localhost",
        NewPassword: "$t3$71Ng1-2_E",
      };
      $testClient.$post(null, "/signups", d, function (err, res) {
        $testClient.$post(null, "/signups", d, function (err, res) {
          expect(res.statusCode).toBe(400);
          done();
        });
      });
    });

    it("RETURNS `HTTP/1.1 400 Bad Request` WHEN THE EMAIL IS RESTRICTED", function (done) {
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
