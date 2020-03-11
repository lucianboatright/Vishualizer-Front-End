import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import AudioFeatures from "./AudioFeatures";
// import Visualizer from "./Visualizer";
import UserFeatures from "./UserFeatures";
import { BrowserRouter as Router } from "react-router-dom";

// import PlayerController from './PlayerController'
import Spotify from "spotify-web-api-js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, OverlayTrigger } from "react-bootstrap";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token !== undefined,
      nowPlaying: {
        name: "Not Checked",
        image: "",
        artist: "",
        id: "",
        progress: ""
      },
      oAuth: params.access_token
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
    localStorage.setItem("spotify_access_token", params.access_token);
    localStorage.setItem("user_id", params.access_token);

    this.audioFeatures = React.createRef();
  }

  componentDidMount() {
    this.Interval = setInterval(() => this.getNowPlaying(), 5000);
    this.getNowPlaying();
  }
  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    if (!this.state.loggedIn) {
      return;
    }
    spotifyWebApi
      .getMyCurrentPlaybackState()
      .then(response => {
        if (!response) {
          return;
        }
        if (this.state.nowPlaying.id !== response.item.id) {
          this.setState({
            nowPlaying: {
              name: response.item.name,
              image: response.item.album.images[1].url,
              artist: response.item.artists[0].name,
              id: response.item.id,
              progress: response.progress_ms
            }
          });
          this.audioFeatures.current.onTrackUpdated(response.item.id);
        }
      })
      .catch(err => {
        if (err.status === 401) {
          this.setState({
            unauthorized: true
          });
        }
      });
  }
  render() {
    if (this.state.unauthorized) {
      return (
        <Router>
          <Redirect to="/" />
        </Router>
      );
    }

    return (
      <div className="App">
        {(() => {
          if (this.state.loggedIn) {
            return (
              <div className="logout-btn">
                <a href="https://accounts.spotify.com/en/logout ">
                  <Button variant="outline-success" size="sm">
                    Log out
                  </Button>
                </a>
              </div>
            );
          } else {
            return (
              <div>
                <div className="spotify">
                  <div className="bar bar-dark"></div>
                  <div className="bar bar-med"></div>
                  <div className="bar bar-light"></div>
                </div>
                <h1>Please Login Using Spotify</h1>
                <br></br>
                <a href="http://localhost:8888/login">
                  <Button variant="outline-success" size="lg">
                    Login
                  </Button>
                </a>
              </div>
            );
          }
        })()}
        {(() => {
          if (this.state.loggedIn && this.state.nowPlaying.id) {
            return (
              <div className="currently-playing">
                <div className="now-playing">
                  <h2>Now Playing:</h2>
                  <h5>
                    {this.state.nowPlaying.name}
                  </h5>
                  <h5>
                    {this.state.nowPlaying.artist}
                  </h5>
                </div>

                <div className="nowplayingimage">
                  <img
                    alt="Album Art Work"
                    src={this.state.nowPlaying.image}
                    style={{ width: 200 }}
                  />
                </div>

                <div className="userwelcome">
                  <UserFeatures
                    ref={this.userFeatures}
                    oAuth={this.state.oAuth}
                  />
                </div>

                <div className="songinfo">
                  <AudioFeatures
                    id={this.state.nowPlaying.id}
                    ref={this.audioFeatures}
                    oAuth={this.state.oAuth}
                  />
                </div>
              </div>
            );
          } else {
            if (this.state.loggedIn) {
              return (
                <div className="no-playback">
                  <h1>No Playback detected</h1>
                </div>
              );
            }
          }
        })()}
      </div>
    );
  }
}

export default App;
