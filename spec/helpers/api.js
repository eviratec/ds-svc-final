
(function (jasmine) {

  const APPLICATION_JSON = "application/json";

  const http = require("http");

  class ApiTestClient {
    constructor (remotePort) {
      this.remoteAddress = "127.0.0.1";
      this.remotePort = remotePort || 9999;
    }

    uniqueLogin () {
      return `test-${Date.now()}@localhost`;
    }

    generatePassword () {
      return `!!${Date.now()}R${Math.random()}@$!`;
    }

    signup (login, password, cb) {
      let d = {
        Email: login,
        NewPassword: password,
      };
      this.$post(null, "/signups", d, cb);
      return this;
    }

    $get (token, path, cb) {
      const options = {
        hostname: this.remoteAddress,
        port: this.remotePort,
        path: path,
        method: "GET",
        headers: {
          "Accept": APPLICATION_JSON
        }
      };

      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.d = "";
        res.on('data', (chunk) => {
          res.d += chunk;
        });
        res.on('end', () => {
          if (res.d) {
            try {
              res.d = JSON.parse(res.d);
            }
            catch (e) {}
          }
          cb(undefined, res);
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        cb(e);
      });

      req.end();
    }

    $post (token, path, data, cb) {
      const postData = JSON.stringify(data);
      const options = {
        hostname: this.remoteAddress,
        port: this.remotePort,
        path: path,
        method: "POST",
        headers: {
          "Content-Type": APPLICATION_JSON,
          "Content-Length": Buffer.byteLength(postData)
        }
      };

      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.d = "";
        res.on('data', (chunk) => {
          res.d += chunk;
        });
        res.on('end', () => {
          if (res.d) {
            try {
              res.d = JSON.parse(res.d);
            }
            catch (e) {}
          }
          cb(undefined, res);
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        cb(e);
      });

      req.write(postData);
      req.end();
    }
  }

  jasmine.createTestClient = function () {
    let testClient = new ApiTestClient();
    return testClient;
  }

})(jasmine);
