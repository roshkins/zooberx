import React, { Component } from "react";
import { PropTypes } from "prop-types";

class Form extends Component {
  render() {
    return (
      <form className="Form">
        <p>
          Right-click on the map to the right to auto-fill that location or type
          in the boxes below. Click "Request" and enjoy your ride.
        </p>
        <input
          type="number"
          name="latitude"
          placeholder="Your latitude"
          value={this.props.latitude}
        />
        <input
          type="number"
          name="longitude"
          placeholder="Your longitude"
          value={this.props.longitude}
        />
        <select
          name="direction"
          value={this.props.direction}
          defaultValue="direction"
        >
          <option disabled value="direction">
            Where to?
          </option>
          <option value="Kenya">Kenya</option>
          <option value="Tanzania">Tanzania</option>
        </select>
        <input type="submit" value="Request" className="Submit" />
      </form>
    );
  }
}

Form.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  direction: PropTypes.string,
  setLatitude: PropTypes.func.isRequired,
  setLongitude: PropTypes.func.isRequired,
  setDirection: PropTypes.func.isRequired
};

export default Form;
