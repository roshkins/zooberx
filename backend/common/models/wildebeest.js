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
    var name;
    // TODO
    callback(null, name);
  };
};
