
import React, { Component } from "react";
import Visualizer from "./Visualizer";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap";


class AudioFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Visualizer = React.createRef();
  }
  onTrackUpdated(track) {
    const spotifyURL = "https://api.spotify.com/v1/audio-features/";
    fetch(spotifyURL + track, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.oAuth
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          track: track,
          songFeatures: response
        });
      });
  }

  componentDidMount() {
    this.onTrackUpdated(this.props.track);
  }

  render() {
    const keyInteger = {
      0: "C",
      1: "C♯/D♭",
      2: "D",
      3: "D♯/E♭",
      4: "E",
      5: "F",
      6: "F♯/G♭",
      7: "G",
      8: "G♯/A♭",
      9: "A",
      10: "A♯/B♭",
      11: "B"
    };
    const getDancelevel = {
      0: "Low",
      0.1: "Low",
      0.2: "Low",
      0.3: "Low",
      0.4: "Medium",
      0.5: "Medium",
      0.6: "Medium",
      0.7: "High",
      0.8: "High",
      0.9: "High",
      1.0: "High"
    };
    const getEnergylevel = {
      0: "Low",
      0.1: "Low",
      0.2: "Low",
      0.3: "Low",
      0.4: "Medium",
      0.5: "Medium",
      0.6: "Medium",
      0.7: "High",
      0.8: "High",
      0.9: "High",
      1.0: "High"
    };
    const getValencelevel = {
      0: "Melancholy",
      0.1: "Melancholy",
      0.2: "Melancholy",
      0.3: "Melancholy",
      0.4: "Neutral",
      0.5: "Neutral",
      0.6: "Neutral",
      0.7: "Positive",
      0.8: "Positive",
      0.9: "Positive",
      1.0: "Positive"
    };
    const getLivenessLevel = {
      0: "Studio",
      0.1: "Studio",
      0.2: "Studio",
      0.3: "Studio",
      0.4: "Live Recording",
      0.5: "Live Recording",
      0.6: "Live Recording",
      0.7: "Live Recording",
      0.8: "Live Recording",
      0.9: "Live Recording",
      1.0: "Live Recording"
    };

    function setLoudnessLevel(getLoudnesStat) {
      if (getLoudnesStat < -35) {
        return "Quiet";
      } else if (getLoudnesStat > -35 && getLoudnesStat < -15) {
        return "Moderate";
      } else {
        return "Loud";
      }
    }

    function setInstrumentalnessValue(getInstrumentalness) {
      if (getInstrumentalness > 0.6) {
        return "No Vocals";
      } else {
        return "Has Vocals";
      }
    }

    function millisToMinutesAndSeconds(getTimeDuration) {
      var minutes = Math.floor(getTimeDuration / 60000);
      var seconds = ((getTimeDuration % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    if (!this.state.songFeatures) {


      return <div className="not-rendering-songFeatures"></div>
    }

    return (




    <div className="AudioFeatures">
       <Visualizer
          songFeatures={this.state.songFeatures}
          ref={this.Visualizer}
        />
    
      <ButtonGroup vertical>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip> The danceability of this song is {this.state.songFeatures.danceability*100}%</Tooltip>}>
        <Button variant='outline-light'>Danceability: { getDancelevel[parseFloat(this.state.songFeatures.danceability).toFixed(1)] }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>The song is written in the {keyInteger[this.state.songFeatures.key]} key</Tooltip>}>
        <Button variant='outline-light'> Key: { keyInteger[this.state.songFeatures.key] }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>There are {this.state.songFeatures.time_signature} beats in each bar</Tooltip>}>
        <Button variant='outline-light'> Time signature: { this.state.songFeatures.time_signature }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>This song is exactly {this.state.songFeatures.duration_ms} milliseconds long</Tooltip>}>
        <Button variant='outline-light'> Duration: { millisToMinutesAndSeconds(this.state.songFeatures.duration_ms) }</Button>
        </OverlayTrigger>
      
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>Spotify says this is {this.state.songFeatures.energy*100}% energetic</Tooltip>}>
        <Button variant='outline-light'> Energy: { getEnergylevel[parseFloat(this.state.songFeatures.energy).toFixed(1)] } </Button>
        </OverlayTrigger>
      </ButtonGroup>
      <ButtonGroup vertical>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>The Tempo for the song is {this.state.songFeatures.tempo}</Tooltip>}>
        <Button variant='outline-light'> BPM: { parseFloat(this.state.songFeatures.tempo).toFixed(0) } </Button>
        </OverlayTrigger>
        <OverlayTrigger
        // key='top'
        // overlay={<Tooltip>There is a {this.state.songFeatures.acousticness*100}% chance that this song is acoustic</Tooltip>}>
        // <Button variant='outline-light'> Acousticness: { this.state.songFeatures.acousticness }</Button>
        // </OverlayTrigger>
        // <OverlayTrigger
        key='top'
        overlay={<Tooltip>There is a {this.state.songFeatures.instrumentalness*100}% chance of not having vocals</Tooltip>}>
        <Button variant='outline-light'> Instrumentalness: { setInstrumentalnessValue(this.state.songFeatures.instrumentalness) }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>Spotify says this is {this.state.songFeatures.valence*100}% positive</Tooltip>}>
        <Button variant='outline-light'> Valence: { getValencelevel[parseFloat(this.state.songFeatures.valence).toFixed(1)] }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>There is a {this.state.songFeatures.liveness*100}% chance that this is live</Tooltip>}>
        <Button variant='outline-light'> Liveness: { getLivenessLevel[parseFloat(this.state.songFeatures.liveness).toFixed(1)] }</Button>
        </OverlayTrigger>
        <OverlayTrigger
        key='top'
        overlay={<Tooltip>This track is mastered at {(this.state.songFeatures.loudness)+60}dB</Tooltip>}>
        <Button variant='outline-light'> Loudness: { setLoudnessLevel(this.state.songFeatures.loudness) }</Button>
        </OverlayTrigger>
        </ButtonGroup>
      
    </div>
    )

  }
}

export default AudioFeatures;
