import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo">ZooberX</div>
        <div className="locationForm">
          <form>
            <label htmlFor="latitude">Your latitude</label>
            <input type="text" name="latitude" />
            <label htmlFor="longitude">Your longitude</label>
            <input type="text" name="longitude" />
            <label htmlFor="direction">What is your destination?</label>
            <select name="direction">
              <option value="Kenya">Kenya</option>
              <option value="Tanzania">Tanzania</option>
            </select>
            <input type="submit" value="Request" />
          </form>
        </div>
        <div className="map">
          <Map
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
