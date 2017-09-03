import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Ride from "./Ride";

class Form extends Component {
  render() {
    const latitude = this.props.pickupLocation
      ? this.props.pickupLocation.lat
      : "";
    const longitude = this.props.pickupLocation
      ? this.props.pickupLocation.lng
      : "";

    return (
      <form
        className="Form"
        onSubmit={e => {
          e.preventDefault();
          if (this.props.pickupLocation && this.props.direction !== "direction")
            this.props.getNearestBeest();
        }}
      >
        <p>
          Right-click on the map to auto-fill that location or type in the boxes
          below. Click "Request" and enjoy your ride.
        </p>
        <input
          id="latitude"
          type="number"
          step="0.01"
          name="latitude"
          placeholder="Your latitude"
          value={latitude}
          onChange={event => this.props.setLatitude(Number(event.target.value))}
        />
        <input
          id="longitude"
          type="number"
          step="0.01"
          name="longitude"
          placeholder="Your longitude"
          value={longitude}
          onChange={event =>
            this.props.setLongitude(Number(event.target.value))}
        />
        <select
          id="direction"
          name="direction"
          value={this.props.direction}
          onChange={event => this.props.setDirection(event.target.value)}
        >
          <option disabled value="direction">
            Where to?
          </option>
          <option value="Kenya">Kenya</option>
          <option value="Tanzania">Tanzania</option>
        </select>
        <input type="submit" value="Request" className="Submit" />
        {this.props.nearestBeestName
          ? <Ride beestName={this.props.nearestBeestName} />
          : ""}
      </form>
    );
  }
}

Form.propTypes = {
  pickupLocation: PropTypes.object,
  direction: PropTypes.string,
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired,
  getNearestBeest: PropTypes.func.isRequired,
  nearestBeestName: PropTypes.string
};

export default Form;
