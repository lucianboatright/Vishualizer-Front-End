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
        resp: localStorage.setItem("sound_features", response)
      })
      console.log()
    })
  }

  componentDidMount() {
    this.onTrackUpdated(this.props.track);
  }

  render() {

    const keyInteger = {0: 'C', 1: 'C♯/D♭', 2: 'D', 3: 'D♯/E♭', 4: 'E', 5: 'F', 6: 'F♯/G♭', 7: 'G', 8: 'G♯/A♭', 9: 'A', 10: 'A♯/B♭', 11: 'B'}
    if (!this.state.songFeatures) {
      return <div></div>
    }
    return (
    <div className="AudioFeatures">
        <div> Selected song danceability: { this.state.songFeatures.danceability }</div>

        <div> Selected song key: { keyInteger[this.state.songFeatures.key] }</div>
        <div> Selected song time signature: { this.state.songFeatures.time_signature }</div>
        <div> Selected song duration: { this.state.songFeatures.duration_ms }</div>
        <div> Selected song energy: { this.state.songFeatures.energy }</div>
        <div> Selected song tempo: { this.state.songFeatures.tempo }</div>
        <div> Selected song acousticness: { this.state.songFeatures.acousticness }</div>
        <div> Selected song instrumentalness: { this.state.songFeatures.instrumentalness }</div>
        <div> Selected song valence: { this.state.songFeatures.valence }</div>
        <div> Selected song liveness: { this.state.songFeatures.liveness }</div>
        <div> Selected song loudness: { this.state.songFeatures.loudness }</div>
    </div>
    )
  }
}


export default AudioFeatures;
