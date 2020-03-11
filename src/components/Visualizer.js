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
      this.props.songFeatures.energy * 5,
      this.props.songFeatures.tempo
    );
    helpers.animate();
    console.log("Song Features in visualizer", this.props.songFeatures.energy);
    return <div></div>;
  }
}

export default Visualizer;
