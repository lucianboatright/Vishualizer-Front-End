import React, { Component } from "react";
import helpers from "../helpers/hooks";
import "./App.css";

class Visualizer extends Component {
  componentDidMount() {
    helpers.init();
    helpers.animate();
    console.log("props", this.props.songFeatures);
  }

  render() {
    return <div></div>;
  }
}

export default Visualizer;
