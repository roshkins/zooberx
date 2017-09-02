import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import Form from "./Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupLocation: null,
      markers: [
        { position: { lat: -3.60345, lng: 34.732605 } },
        { position: { lat: 1.261154, lng: 34.997316 } }
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <div className="LeftColumn">
          <div className="Logo">
            zoober<span className="x">X</span>
          </div>
          <Form />
        </div>
        <div className="Map">
          <Map
            setLocation={mouseEvent => {
              const coordinates = mouseEvent.latLng;
              this.setState({
                pickupLocation: {
                  lat: coordinates.lat(),
                  lng: coordinates.lng()
                }
              });
              mouseEvent.stop();
            }}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            pickupLocation={this.state.pickupLocation}
            markers={this.state.markers}
          />
        </div>
      </div>
    );
  }
}

export default App;
