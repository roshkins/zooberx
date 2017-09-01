import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from "react";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const googleMapURL =
  "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCoIwKw-GePkOM4yjeL4a55AIKu_E0C65Q";

const Map = withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
    googleMapURL={googleMapURL}
  >
    <Marker />
  </GoogleMap>
);

export default Map;

// adapted from src: https://github.com/tomchentw/react-google-maps
