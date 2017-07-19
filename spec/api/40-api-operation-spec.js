
describe("API_OPERATION REST API", function () {

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

  describe("/api/:apiId/operations", function () {

    let app;
    let api;
    let appData;
    let apiData;
    let appId;
    let apiId;

    let opData;

    beforeEach(function (done) {
      appData = {
        Name: "My Test App",
      };
      apiData = {
        Name: "My Test API",
      };
      opData = {
        Name: "myOperation",
      };
      $testClient.$post(authorization, `/apps`, appData, function (err, res) {
        $testClient.$get(authorization, res.headers.location, function (err, res) {
          app = res.d;
          appId = app.Id;
          $testClient.$post(authorization, `/app/${appId}/apis`, apiData, function (err, res) {
            $testClient.$get(authorization, res.headers.location, function (err, res) {
              api = res.d;
              apiId = api.Id;
              done();
            });
          });
        });
      });
    });

    describe("createApiOperation <POST> with valid parameters", function () {

      it("RETURNS `HTTP/1.1 403 Forbidden` WHEN `Authorization` HEADER IS NOT PROVIDED", function (done) {
        $testClient.$post(null, `/api/${apiId}/operations`, opData, function (err, res) {
          expect(res.statusCode).toBe(403);
          done();
        });
      });

      it("RETURNS `HTTP/1.1 303 See Other` WHEN `Authorization` HEADER IS PROVIDED", function (done) {
        $testClient.$post(authorization, `/api/${apiId}/operations`, opData, function (err, res) {
          expect(res.statusCode).toBe(303);
          expect(res.headers.location).toMatch(/^\/api\/([a-z0-9-]{36})\/operation\/([a-z0-9-]{36})$/);
          done();
        });
      });

      it("CREATES AN API Operation", function (done) {
        $testClient.$post(authorization, `/api/${apiId}/operations`, opData, function (err, res) {
          $testClient.$get(authorization, res.headers.location, function (err, res) {
            expect(res.statusCode).toBe(200);
            done();
          });
        });
      });

      it("ADDS THE OPERATION TO THE APIS LIST OF OPERATIONS", function (done) {
        $testClient.$post(authorization, `/api/${apiId}/operations`, opData, function (err, res) {
          let opId = res.headers.location.split(/\//g)[4];
          $testClient.$get(authorization, `/api/${apiId}/operations`, function (err, res) {
            expect(res.statusCode).toBe(200);
            expect(res.d).toEqual(jasmine.arrayContaining([
              jasmine.objectContaining({
                "Id": opId
              }),
            ]));
            done();
          });
        });
      });

    });

  });

});
