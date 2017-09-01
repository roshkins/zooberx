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

  it('should add wildebeests', function(done) {
    // Example test:
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
    superagent
      .post('http://localhost:3000/api/wildebeests')
      .send({
        latitude: '1',
        longitude: '2',
        name: 'Adrian',
        direction: 'Kenya',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, response) {
        if (err) {
          return done(err);
        }

        assert.equal(response.status, 200);
        assert.ok(response.body);
        assert.equal(response.body.latitude, '1');
        assert.equal(response.body.longitude, '2');
        assert.equal(response.body.name, 'Adrian');
        assert.equal(response.body.direction, 'Kenya');
        done();
      });
  });

  it('should list all wildebeests', function(done) {
    const wildebeestsObjects = [
      {
        latitude: '1',
        longitude: '2',
        name: 'Adrian',
        direction: 'Kenya',
      },
      {
        latitude: '4',
        longitude: '5',
        name: 'Vashti',
        direction: 'Tanzania',
      },
    ];
    var postCount = 0;
    const doneWithPosts = () => {
      // This will be called only after all post requests have finished.
      if (postCount < wildebeestsObjects.length - 1) {
        postCount++;
        return;
      } else {
        // check if the beests were added
        superagent
          .get('http://localhost:3000/api/wildebeests')
          .send()
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function(err, response) {
            if (err) {
              return done(err);
            }
            assert.equal(response.status, 200);
            assert.ok(response.body);
            console.log(
              'post:',
              wildebeestsObjects,
              'response:',
              response.body
            );
            assert.deepEqual(wildebeestsObjects, response.body);
            done();
          });
      }
    };

    wildebeestsObjects.forEach(beest => {
      superagent
        .post('http://localhost:3000/api/wildebeests')
        .send(beest)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function(err, response) {
          if (err) {
            return done(err);
          }

          doneWithPosts();
        });
    });
  });
});
