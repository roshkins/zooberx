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
      if (err) {
        callback(err, null);
        return;
      }
      if (beests.length === 0) {
        callback(null, 'no_beests');
        return;
      }
      console.log('beests.length', beests.length);
      var closestBeest = beests.reduce((bestSoFarBeest, beest) => {
        var beestLongitude = Number(beest.longitude);
        var beestLatitude = Number(beest.latitude);

        var bestLongitude = Number(bestSoFarBeest.longitude);
        var bestLatitude = Number(bestSoFarBeest.latitude);

        // find euclidean distances
        var beestDistance = Math.sqrt(
          Math.pow(beestLatitude - myLatitude, 2) +
            Math.pow(beestLongitude - myLongitude, 2)
        );
        var bestDistance = Math.sqrt(
          Math.pow(bestLatitude - myLatitude, 2) +
            Math.pow(bestLongitude - myLongitude, 2)
        );

        if (bestDistance === null || beestDistance < bestDistance) {
          return beest;
        } else {
          return bestSoFarBeest;
        }
      }, beests[0]);
      console.log(closestBeest);
      name = closestBeest.name;
      callback(null, name);
    });
  };
};
