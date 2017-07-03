const http = require("http");
const TEST_API_PORT = 9999;
const APPLICATION_JSON = "application/json";

const DatastudioApi = require("../../");

describe("A HTTP API", function () {

  describe("AUTH ATTEMPT", function () {

    let api;
    let urlBase;

    let result;

    beforeEach(function () {
      api = DatastudioApi(TEST_API_PORT);
      urlBase = `http://localhost:${TEST_API_PORT}`;
    });

    it("SHOULD RETURN `HTTP/1.1 400 Bad Request` IF THE LOGIN IS INVALID", function (done) {
      const postData = JSON.stringify({
        Login: "test@test.com",
        Password: "$t3$71Ng1-2_E",
      });

      const options = {
        hostname: "127.0.0.1",
        port: TEST_API_PORT,
        path: "/auth/attempts",
        method: "POST",
        headers: {
          "Content-Type": APPLICATION_JSON,
          "Content-Length": Buffer.byteLength(postData)
        }
      };

      const req = http.request(options, (res) => {
        expect(res.statusCode).toBe(400);
        done();
        // res.setEncoding('utf8');
        // res.on('data', (chunk) => {
        //   console.log(`BODY: ${chunk}`);
        // });
        // res.on('end', () => {
        //   console.log('No more data in response.');
        // });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });

      req.write(postData);

      req.end();
    });

  });
  
});
