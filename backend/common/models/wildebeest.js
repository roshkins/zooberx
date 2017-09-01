'use strict';

module.exports = function(Wildebeest) {
  /**
   * gets the nearest wildebeest to the given location and direction
   * @param {string} latitude the latitude of your current location
   * @param {string} longitude The longitude of your current location.
   * @param {string} destination The destination country of your wildebeest.
   * @param {Function(Error, string)} callback
   */

  Wildebeest.getYourWildebeest = function(
    latitude,
    longitude,
    destination,
    callback
  ) {
    console.log('in getYourWildebeest');
    var name;
    var myLongitude = Number(longitude);
    var myLatitude = Number(latitude);
    // Get array of beests
    Wildebeest.find({where: {direction: destination}}, function(err, beests) {
      // go through each one, computer distance, save to bestBeast if best
      console.log('Wildebeest response', err, beests);
      if (err) {
        callback(err, null);
        return;
      }
      if (beests.length === 0) {
        callback({name: 'noBeests', message: 'No beests are available'}, null);
      }
      var closestBeest = beests.reduce((bestSoFarBeest, beest) => {
        var beestLongitude = Number(beest.longitude);
        var beestLatitude = Number(beest.latitude);

        var bestLongitude = Number(bestSoFarBeest.longitude);
        var bestLatitude = Number(bestSoFarBeest.latitude);

        var beestDistance = Math.sqrt(
          Math.pow(beestLatitude, 2) + Math.pow(beestLongitude, 2)
        );
        console.log(beestDistance);
        var bestDistance = Math.sqrt(
          Math.pow(bestLatitude, 2) + Math.pow(bestLongitude, 2)
        );
        if (bestDistance === null || beestDistance < bestDistance) {
          return beest;
        } else {
          return bestSoFarBeest;
        }
      }, null);
      name = closestBeest.name;
      callback(null, name);
    });
  };
};
