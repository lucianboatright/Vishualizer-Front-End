import React, { Component } from 'react';
import './App.css';

class AudioFeatures extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onTrackUpdated(track) {
    const spotifyURL = "https://api.spotify.com/v1/audio-features/"
    fetch(spotifyURL + track, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.oAuth
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        track: track,
        songFeatures: response,
      })
    })
  }

  componentDidMount() {
    this.onTrackUpdated(this.props.track);
  }

  render() {
    if (!this.state.songFeatures) {
      return <div></div>
    }
    return (
    <div className="AudioFeatures">
        <div> Selected song danceability: { this.state.songFeatures.danceability }</div>
        <div> Selected song key: { this.state.songFeatures.key }</div>

    </div>
    )
  }
}

export default AudioFeatures;
