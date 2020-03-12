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
      this.props.songFeatures.danceability *50,
      this.props.songFeatures.energy * 20,
      this.props.songFeatures.tempo/10,
      this.props.songFeatures.duration_ms,
      this.props.songFeatures.valence*10
    );
    helpers.animate();
    return <div></div>;
  }
}

export default Visualizer;
