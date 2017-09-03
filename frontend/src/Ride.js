import React, { Component } from "react";
import { PropTypes } from "prop-types";

class Ride extends Component {
  /**
  * Renders the ride when there are beests or displays an error.
  * @param {string} beestName The name of the beest or "no_beests".
   */
  render() {
    if (this.props.beestName === "no_beests") {
      return (
        <div className="Ride">
          Error! No beests found. Make sure you filled out the form properly.
        </div>
      );
    }
    return (
      <div className="Ride">
        <div className="RideImg" />Your wildebeest, {this.props.beestName}, is
        arriving! Look for a brown animal with a long, furry mane. Food is
        complimentary on this ride.
      </div>
    );
  }
}

Ride.propTypes = {
  beestName: PropTypes.string.isRequired
};

export default Ride;
