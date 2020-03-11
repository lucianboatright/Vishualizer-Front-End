import React, { Component } from "react";
import helpers from "../helpers/hooks";

import "./App.css";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({
      features: this.props.songFeatures
    });
  }

  render() {
    helpers.init(
      this.props.songFeatures.key,
      this.props.songFeatures.danceability,
      this.props.songFeatures.energy * 100,
      this.props.songFeatures.tempo,
      this.props.songFeatures.duration_ms
    );
    helpers.animate();
    return <div></div>;
  }
}

export default Visualizer;
