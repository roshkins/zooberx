import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="LeftColumn">
          <div className="Logo">
            zoober<span className="x">X</span>
          </div>
          <form className="Form">
            <p>
              Click on the map to the right to auto-fill that location or type
              in the boxes below. Click "Request" and enjoy your ride.
            </p>
            <label htmlFor="latitude">Your latitude</label>
            <input type="number" name="latitude" />
            <label htmlFor="longitude">Your longitude</label>
            <input type="number" name="longitude" />
            <label htmlFor="direction">What is your destination?</label>
            <select name="direction">
              <option value="Kenya">Kenya</option>
              <option value="Tanzania">Tanzania</option>
            </select>
            <input type="submit" value="Request" className="Submit" />
          </form>
        </div>
        <div className="Map">
          <Map
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
