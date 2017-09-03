'use strict';
// Loopback testing code taken from here: https://stackoverflow.com/a/35038751/1136754

const assert = require('chai').assert;
const superagent = require('superagent');
const app = require('../server/server');


/**
Test our Wildebeest model.
*/
describe('Wildebeest model',
 function() {
  var server;
  const loopbackUrl = 'http://localhost:3001/';
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
      direction: 'Tanzania',
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
      direction: 'Tanzania',
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
      direction: 'Kenya',
    },
    {
      latitude: '1.111232',
      longitude: '3.2284',
      name: 'Beth',
      direction: 'Kenya',
    },
    {
      latitude: '6',
      longitude: '7',
      name: 'Ashley',
      direction: 'Tanzania',
    },
  ];

/** Submits a HTTP request to check wildebeests can be added.
 */
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
        .post(loopbackUrl + 'api/wildebeests')
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

/**
 * This tests getWildebeests() by displaying all the Wildebeests we
 * added above.
 * @memberof test
 */
  it('should list all wildebeests', function(done) {
    // check if the beests were added
    superagent
      .get(loopbackUrl + 'api/wildebeests')
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

/** Here I know the closest beest is Beth, so I make sure it is. */
  it('should find the closest beest', function(done) {
    superagent
      .get(loopbackUrl + 'api/wildebeests/getYourWildebeest')
      .send({
        latitude: '1.111232',
        longitude: '3.2284',
        destination: 'Kenya',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, response) {
        if (err) {
          return done(err);
        }
        assert.equal(response.status, 200);
        assert.ok(response.body);
        assert.equal(response.body.name, 'Beth');
        done();
      });
  });

/** Check for bounding error if it happened.
* @memberof test
*/
  it('should find the closest beest with a location not in range', function(
    done
  ) {
    superagent
      .get(loopbackUrl + 'api/wildebeests/getYourWildebeest')
      .send({
        latitude: '333.46',
        longitude: '1445.8237321',
        destination: 'Tanzania',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, response) {
        if (err) {
          return done(err);
        }
        assert.equal(response.status, 200);
        assert.ok(response.body);
        assert.equal(response.body.name, 'Ashley');
        done();
      });
  });

/**
* If no beests are going in a direction we should tell the user.
* This deletes 9 beests and checks for the nearest one going in the
* opposite direction. It should not return a valid beast.
* @memberof test
*/
  // eslint-disable-next-line max-len
  it('should return "no_beests" if none of the beests are going in this direction', function(
    done
  ) {
    const idsToDelete = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var countDone = 0;
    const allDone = () => {
      if (countDone < idsToDelete.length - 1) {
        return countDone++;
      } else {
        superagent
          .get(loopbackUrl + 'api/wildebeests/getYourWildebeest')
          .send({
            latitude: '333.46',
            longitude: '1445.8237321',
            destination: 'Kenya',
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function(err, response) {
            if (err) {
              return done(err);
            }

            assert.equal(response.status, 200);
            assert.equal(response.body.name, 'no_beests');
            done();
          });
      }
    };

    idsToDelete.forEach(number => {
      superagent
        .delete(loopbackUrl + 'api/wildebeests/' + number)
        .send()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function(err, response) {
          if (err) {
            return done(err);
          }
          console.log(response.body);
          assert.equal(response.status, 200);
          assert.ok(response.body);
          allDone();
        });
    });
  });
});
