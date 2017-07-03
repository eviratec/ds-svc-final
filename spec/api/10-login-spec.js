const TEST_API_PORT = 9999;
const DatastudioApi = require("../../");

describe("A HTTP API", function () {

  describe("AUTH ATTEMPT", function () {

    let api;

    let validLogin;
    let validPassword;

    let invalidLogin;
    let invalidPassword;

    let $testClient;

    beforeEach(function (done) {

      api = DatastudioApi(TEST_API_PORT);
      $testClient = jasmine.createTestClient(TEST_API_PORT);

      validLogin = $testClient.uniqueLogin();
      validPassword = $testClient.generatePassword();

      invalidLogin = $testClient.uniqueLogin();
      invalidPassword = $testClient.generatePassword();

      $testClient.signup(validLogin, validPassword, function (err, res) {
        done();
      });

    });

    afterEach(function (done) {
      api.server.close(done);
    });

    it("SHOULD RETURN `HTTP/1.1 400 Bad Request` IF THE LOGIN IS INVALID", function (done) {
      let d = {
        Login: invalidLogin,
        Password: invalidPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it("SHOULD RETURN `HTTP/1.1 400 Bad Request` IF THE PASSWORD IS INCORRECT", function (done) {
      let d = {
        Login: validLogin,
        Password: invalidPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it("SHOULD RETURN `HTTP/1.1 303 See Other` IF THE LOGIN IS VALID", function (done) {
      let d = {
        Login: validLogin,
        Password: validPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(303);
        done();
      });
    });

    it("SHOULD RETURN A TOKEN IN THE BODY OF THE VALID AUTH ATTEMPT", function (done) {
      let d = {
        Login: validLogin,
        Password: validPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        if (err) {
          return done(err);
        }
        $testClient.$get(null, res.headers.location, function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.statusCode).toBe(200);
          expect(res.d).toEqual(jasmine.objectContaining({
            Token: jasmine.objectContaining({
              Id: jasmine.any(String),
              Key: jasmine.any(String),
              Created: jasmine.any(Number),
              Expiry: jasmine.any(Number),
            }),
          }));
          done();
        });
      });
    });

  });

});
