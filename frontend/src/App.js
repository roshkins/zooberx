import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import Form from "./Form";

const backendApi = "http://localhost:3001/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupLocation: null,
      pickupDirection: "direction",
      beests: [
        {
          latitude: "-2.5",
          longitude: "34.732605",
          name: "Abe",
          direction: "Tanzania"
        },
        {
          latitude: "1",
          longitude: "34.732605",
          name: "Tony",
          direction: "Tanzania"
        },
        {
          latitude: "-2.5",
          longitude: "34.732605",
          name: "Dan",
          direction: "Kenya"
        },
        {
          latitude: "-1.5",
          longitude: "34.732605",
          name: "Vashti",
          direction: "Tanzania"
        },
        {
          latitude: "0",
          longitude: "34.732605",
          name: "Moses",
          direction: "Tanzania"
        },
        {
          latitude: "1",
          longitude: "34.732605",
          name: "Dana",
          direction: "Tanzania"
        },
        {
          latitude: "-0.5",
          longitude: "34.732605",
          name: "Sandra",
          direction: "Kenya"
        },
        {
          latitude: "-1.2",
          longitude: "34.732605",
          name: "Michelle",
          direction: "Kenya"
        },
        {
          latitude: "-0.4",
          longitude: "34.732605",
          name: "Beth",
          direction: "Kenya"
        },
        {
          latitude: "-1.8",
          longitude: "34.732605",
          name: "Ashley",
          direction: "Tanzania"
        }
      ],
      destinations: [
        { position: { lat: -3.60345, lng: 34.732605 } },
        { position: { lat: -1.261154, lng: 34.997316 } }
      ]
    };
  }
  componentDidMount() {
    const getBeestsFromServer = () => {
      fetch(backendApi + "wildebeests", {
        method: "GET",
        headers: { Accept: "application/json" }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({ beests: json });
        });
    };
    getBeestsFromServer();
    setInterval(getBeestsFromServer, 3000);
  }

  getNearestBeest(latitude, longitude, direction) {
    fetch(
      backendApi +
        `wildebeests/getYourWildebeest?latitude=${latitude}&longitude=${longitude}&destination=${direction}`,
      {
        method: "GET",
        headers: { Accept: "application/json" }
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ nearestBeestName: json.name });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="LeftColumn">
          <div className="Logo">
            zoober<span className="x">X</span>
          </div>
          <Form
            getNearestBeest={() =>
              this.getNearestBeest(
                this.state.pickupLocation.lat,
                this.state.pickupLocation.lng,
                this.state.pickupDirection
              )}
            nearestBeestName={this.state.nearestBeestName}
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
            destinations={this.state.destinations}
            beests={this.state.beests}
          />
        </div>
      </div>
    );
  }
}

export default App;
