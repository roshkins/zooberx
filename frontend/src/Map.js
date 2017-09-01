import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from "react";
import PropTypes from "prop-types";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCoIwKw-GePkOM4yjeL4a55AIKu_E0C65Q";

class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: -1.432302, lng: 34.8649605 }}
        onDoubleClick={this.props.onDoubleClick}
        googleMapURL={googleMapURL}
      >
        <Marker position={{ lat: -3.60345, lng: 34.732605 }} />
        <Marker position={{ lat: 1.261154, lng: 34.997316 }} />
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  onDoubleClick: PropTypes.func.isRequired
};
export default withGoogleMap(Map);

// adapted from src: https://github.com/tomchentw/react-google-maps
