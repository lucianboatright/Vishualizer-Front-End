import React, { Component } from "react";

// import { render } from "react-dom";
import helpers from '../helpers/hooks'

// import { Stage, Layer, Circle, Line, Text, Rect } from "react-konva";
import "./App.css";

class Visualizer extends Component {
  componentDidMount() {

    helpers.init();
    helpers.animate();
    console.log("VIS CIRCLE ARRAY",helpers.returnCircleArray())
    // helpers.animate();
    // for (var i = 0; i < 20; i++) {
    //   this.state.circleArray.push({
    //     x: Math.random() * window.innerWidth,
    //     y: Math.random() * window.innerHeight,
    //     red: Math.random() * 255,
    //     green: Math.random() * 255,
    //     blue: Math.random() * 255
    //   });
    // }

  }

  render() {
    return (

      <div></div>
    );
  }
}

export default Visualizer;
