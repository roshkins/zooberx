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
              Double-click on the map to the right to auto-fill that location or
              type in the boxes below. Click "Request" and enjoy your ride.
            </p>
            <input type="number" name="latitude" placeholder="Your latitude" />
            <input
              type="number"
              name="longitude"
              placeholder="Your longitude"
            />
            <select name="direction" defaultValue="direction">
              <option disabled value="direction">
                Where to?
              </option>
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
