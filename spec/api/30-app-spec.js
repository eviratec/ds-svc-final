
describe("APP REST API", function () {

  let api;

  let userId;
  let authorization;

  let login;
  let password;

  let $testClient;

  beforeEach(function (done) {

    api = jasmine.startTestApi();
    $testClient = jasmine.createTestClient();

    login = $testClient.uniqueLogin();
    password = $testClient.generatePassword();

    $testClient.initUser(login, password, function (err, d) {
      if (err) return done(err);
      userId = d.UserId;
      authorization = d.TokenKey;
      done();
    });

  });

  afterEach(function (done) {
    api.server.close(done);
  });

  describe("/apps", function () {

    let d;

    beforeEach(function () {
      d = {
        Name: "My Test App",
      };
    });

    describe("createApp <POST> with valid parameters", function () {

      it("RETURNS `HTTP/1.1 403 Forbidden` WHEN `Authorization` HEADER IS NOT PROVIDED", function (done) {
        $testClient.$post(null, `/apps`, d, function (err, res) {
          expect(res.statusCode).toBe(403);
          done();
        });
      });

      it("RETURNS `HTTP/1.1 303 See Other` WHEN `Authorization` HEADER IS PROVIDED", function (done) {
        $testClient.$post(authorization, `/apps`, d, function (err, res) {
          expect(res.statusCode).toBe(303);
          expect(res.headers.location).toMatch(jasmine.idUrlRegexp("app"));
          done();
        });
      });

      it("CREATES A RESOURCE REACHABLE VIA THE URI IN THE `Location` HEADER", function (done) {
        $testClient.$post(authorization, `/apps`, d, function (err, res) {
          $testClient.$get(authorization, `${res.headers.location}`, function (err, res) {
            expect(res.statusCode).toBe(200);
            expect(res.d).toEqual(jasmine.any(Object));
            done();
          });
        });
      });

    });

  });

  describe("/apps/all", function () {

    describe("getAllApps <GET>", function () {

      it("RETURNS `HTTP/1.1 403 Forbidden` WHEN `Authorization` HEADER IS NOT PROVIDED", function (done) {
        $testClient.$get(null, `/apps/all`, function (err, res) {
          expect(res.statusCode).toBe(403);
          done();
        });
      });

      it("RETURNS `HTTP/1.1 200 OK` WITH AN ARRAY WHEN `Authorization` HEADER IS PROVIDED", function (done) {
        $testClient.$get(authorization, `/apps/all`, function (err, res) {
          expect(res.statusCode).toBe(200);
          expect(Array.isArray(res.d)).toBe(true);
          done();
        });
      });

    });

  });

});
