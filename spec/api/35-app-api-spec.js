
describe("APP_API REST API", function () {

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

  describe("/app/:appId/apis", function () {

    let appData;
    let app;
    let appId;

    let apiData;

    beforeEach(function (done) {
      apiData = {
        Name: "My Test API",
      };
      appData = {
        Name: "My Test App",
      };
      $testClient.$post(authorization, `/apps`, appData, function (err, res) {
        $testClient.$get(authorization, res.headers.location, function (err, res) {
          app = res.d;
          appId = app.Id;
          done();
        });
      });
    });

    describe("createAppApi <POST> with valid parameters", function () {

      it("RETURNS `HTTP/1.1 403 Forbidden` WHEN `Authorization` HEADER IS NOT PROVIDED", function (done) {
        $testClient.$post(null, `/app/${appId}/apis`, apiData, function (err, res) {
          expect(res.statusCode).toBe(403);
          done();
        });
      });

      it("RETURNS `HTTP/1.1 303 See Other` WHEN `Authorization` HEADER IS PROVIDED", function (done) {
        $testClient.$post(authorization, `/app/${appId}/apis`, apiData, function (err, res) {
          expect(res.statusCode).toBe(303);
          expect(res.headers.location).toMatch(jasmine.idUrlRegexp("app", "api"));
          done();
        });
      });

      it("CREATES AN APP API", function (done) {
        $testClient.$post(authorization, `/app/${appId}/apis`, apiData, function (err, res) {
          $testClient.$get(authorization, res.headers.location, function (err, res) {
            expect(res.statusCode).toBe(200);
            done();
          });
        });
      });

      it("ADDS THE API TO THE APPS LIST OF APIS", function (done) {
        $testClient.$post(authorization, `/app/${appId}/apis`, apiData, function (err, res) {
          let apiId = res.headers.location.split(/\//g)[4];
          $testClient.$get(authorization, `/app/${appId}`, function (err, res) {
            expect(res.statusCode).toBe(200);
            expect(res.d).toEqual(jasmine.objectContaining({
              "Apis": jasmine.arrayContaining([
                jasmine.objectContaining({
                  "Id": apiId
                }),
              ]),
            }));
            done();
          });
        });
      });

    });

  });

});
