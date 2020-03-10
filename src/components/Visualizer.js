import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Circle, Line, Text, Rect } from "react-konva";
import "./App.css";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleArray: []
    };
  }

  componentDidMount() {
    this.setState({
      songInfo: this.props.songFeatures
    });
    for (var i = 0; i < 20; i++) {
      this.state.circleArray.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        red: Math.random() * 255,
        green: Math.random() * 255,
        blue: Math.random() * 255
      });
    }
  }

  render() {
    console.log("Audioo", this.state.songInfo);
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          zIndex: 0
        }}
      >
        <Layer>
          {this.state.circleArray.map(c => {
            const fill = `rgb(${c.red}, ${c.green}, ${c.blue})`;
            return <Circle x={c.x} y={c.y} radius={50} fill={fill} />;
          })}
        </Layer>
      </Stage>
    );
  }
}

export default Visualizer;
