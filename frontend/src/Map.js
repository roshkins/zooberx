import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React, { Component } from "react";
import PropTypes from "prop-types";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCoIwKw-GePkOM4yjeL4a55AIKu_E0C65Q";

class Map extends Component {
  constructor(props) {
    super(props);
    var markers = this.props.destinations.concat(
      this.props.beests.map(beest => ({
        position: { lat: Number(beest.latitude), lng: Number(beest.longitude) }
      }))
    );
    markers = this.props.pickupLocation
      ? markers.concat({ position: this.props.pickupLocation })
      : markers;
    this.state = {
      markers
    };
  }
  render() {
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: -1.432302, lng: 34.8649605 }}
        onRightClick={this.props.setLocation}
        googleMapURL={googleMapURL}
      >
        {this.state.markers.map((marker, index) =>
          <Marker {...marker} key={index} />
        )}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  setLocation: PropTypes.func.isRequired,
  destinations: PropTypes.array.isRequired,
  beests: PropTypes.array.isRequired
};
export default withGoogleMap(Map);

// adapted from src: https://github.com/tomchentw/react-google-maps
