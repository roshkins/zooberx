'use strict';
// Loopback testing code taken from here: https://stackoverflow.com/a/35038751/1136754

const assert = require('chai').assert;
const superagent = require('superagent');
const app = require('../server/server');

describe('Wildebeest model', function() {
  var server;

  beforeEach(function(done) {
    server = app.listen(done);
  });

  afterEach(function(done) {
    server.close(done);
  });

  it('should assert true', function() {
    // superagent
    //   .post('http://localhost:3000/api/People/login')
    //   .send({ email: 'john@doe.com', password: 'foobar' })
    //   .set('Accept', 'application/json')
    //   .set('Content-Type', 'application/json')
    //   .end(function(err, loginRes) {
    //     if (err) { return done(err); }
    //
    //       assert.equal(loginRes.status, 200);
    //       assert.ok(loginRes.body);
    //       assert.equal(loginRes.body.userId, 1);
    //     }
    //   });
    assert.equal(true, true);
  });
});
