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

  const wildebeestsObjects = [
    {
      latitude: '1',
      longitude: '2',
      name: 'Abe',
      direction: 'Kenya',
    },
    {
      latitude: '4',
      longitude: '5',
      name: 'Tony',
      direction: 'Tanzania',
    },
    {
      latitude: '1',
      longitude: '2',
      name: 'Dan',
      direction: 'Kenya',
    },
    {
      latitude: '4',
      longitude: '5',
      name: 'Vashti',
      direction: 'Tanzania',
    },
    {
      latitude: '1',
      longitude: '2',
      name: 'Moses',
      direction: 'Kenya',
    },
    {
      latitude: '4',
      longitude: '5',
      name: 'Dana',
      direction: 'Tanzania',
    },
    {
      latitude: '1',
      longitude: '2',
      name: 'Sandra',
      direction: 'Kenya',
    },
    {
      latitude: '4',
      longitude: '5',
      name: 'Michelle',
      direction: 'Tanzania',
    },
    {
      latitude: '1',
      longitude: '2',
      name: 'Beth',
      direction: 'Kenya',
    },
    {
      latitude: '4',
      longitude: '5',
      name: 'Ashley',
      direction: 'Tanzania',
    },
  ];

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

    var postCount = 0;
    const doneWithPosts = () => {
      // This will be called only after all post requests have finished.
      if (postCount < wildebeestsObjects.length - 1) {
        postCount++;
        return;
      } else {
        done();
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

  it('should list all wildebeests', function(done) {
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
        assert.deepEqual(
          wildebeestsObjects,
          response.body.map(beest => {
            delete beest.id;
            return beest;
          })
        );
        done();
      });
  });
});
