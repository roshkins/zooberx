import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import Form from "./Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupLocation: null,
      pickupDirection: "direction",
      beests: [
        {
          latitude: "1",
          longitude: "2",
          name: "Abe",
          direction: "Tanzania"
        },
        {
          latitude: "4",
          longitude: "5",
          name: "Tony",
          direction: "Tanzania"
        },
        {
          latitude: "1",
          longitude: "2",
          name: "Dan",
          direction: "Kenya"
        },
        {
          latitude: "4",
          longitude: "5",
          name: "Vashti",
          direction: "Tanzania"
        },
        {
          latitude: "1",
          longitude: "2",
          name: "Moses",
          direction: "Tanzania"
        },
        {
          latitude: "4",
          longitude: "5",
          name: "Dana",
          direction: "Tanzania"
        },
        {
          latitude: "1",
          longitude: "2",
          name: "Sandra",
          direction: "Kenya"
        },
        {
          latitude: "4",
          longitude: "5",
          name: "Michelle",
          direction: "Kenya"
        },
        {
          latitude: "1.111232",
          longitude: "3.2284",
          name: "Beth",
          direction: "Kenya"
        },
        {
          latitude: "6",
          longitude: "7",
          name: "Ashley",
          direction: "Tanzania"
        }
      ],
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
          <Form
            pickupLocation={this.state.pickupLocation}
            setLatitude={lat =>
              this.setState({
                pickupLocation: { ...this.state.pickupLocation, lat }
              })}
            setLongitude={lng =>
              this.setState({
                pickupLocation: { ...this.state.pickupLocation, lng }
              })}
            setDirection={pickupDirection =>
              this.setState({
                pickupDirection
              })}
            direction={this.state.pickupDirection}
          />
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
