
describe("AUTHENTICATION REST API", function () {

  describe("[ POST   ] /auth/attempts", function () {

    let api;

    let validLogin;
    let validPassword;

    let invalidLogin;
    let invalidPassword;

    let $testClient;

    beforeEach(function (done) {

      api = jasmine.startTestApi();
      $testClient = jasmine.createTestClient();

      validLogin = $testClient.uniqueLogin();
      validPassword = $testClient.generatePassword();

      invalidLogin = $testClient.uniqueLogin();
      invalidPassword = $testClient.generatePassword();

      $testClient.signup(validLogin, validPassword, function (err, res) {
        if (err) return done(err);
        done();
      });

    });

    afterEach(function (done) {
      api.server.close(done);
    });

    it("RETURNS `HTTP/1.1 400 Bad Request` WHEN THE LOGIN IS INVALID", function (done) {
      let d = {
        Login: invalidLogin,
        Password: invalidPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it("RETURNS `HTTP/1.1 400 Bad Request` WHEN THE PASSWORD IS INCORRECT", function (done) {
      let d = {
        Login: validLogin,
        Password: invalidPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it("RETURNS `HTTP/1.1 303 See Other` WHEN THE ATTEMPT IS SUCCESSFUL", function (done) {
      let d = {
        Login: validLogin,
        Password: validPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        expect(res.statusCode).toBe(303);
        done();
      });
    });

    it("INCLUDES A `Token` IN THE BODY OF A SUCCESSFUL AUTH ATTEMPT", function (done) {
      let d = {
        Login: validLogin,
        Password: validPassword,
      };
      $testClient.$post(null, "/auth/attempts", d, function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toBe(303);
        expect(res.headers.location).toBeDefined();
        $testClient.$get(null, res.headers.location, function (err, res) {
          if (err) return done(err);
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
