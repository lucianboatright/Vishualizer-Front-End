import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import helpers from '../helpers/hooks'
// import { Stage, Layer, Circle, Line, Text, Rect } from "react-konva";
import "./App.css";

class Visualizer extends Component {
  componentDidMount() {
    helpers.multiply();
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
    console.log("FROM Visualizer")
    return (

      <div></div>
    );
  }
}

export default Visualizer;
