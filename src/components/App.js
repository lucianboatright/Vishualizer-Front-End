import React, { Component } from 'react';
import './App.css';
import AudioFeatures from './AudioFeatures';
import VisualizerInfo from './VisualizerInfo';
import UserFeatures from './UserFeatures'

// import PlayerController from './PlayerController'
import Spotify from 'spotify-web-api-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token !== undefined,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        artist: '',
        id: '',
        progress: ''
       },
      oAuth: params.access_token
     }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
    localStorage.setItem("spotify_access_token", params.access_token);
    localStorage.setItem("user_id", params.access_token);

    this.audioFeatures = React.createRef()
  }

  componentDidMount() {
    this.Interval = setInterval(
      () => this.getNowPlaying(),
      5000
    );
    this.getNowPlaying();
  }
  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying(){
    if (!this.state.loggedIn) {
      return
    }
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        if (!response) {
          return

        }
        if (this.state.nowPlaying.id !== response.item.id) {
          console.log('INITIAL RESPONCE APP.js', response)
          this.setState({
            nowPlaying: {
              name: response.item.name,
              image: response.item.album.images[1].url,
              artist: response.item.artists[0].name,
              id: response.item.id,
              progress: response.progress_ms
            }
          })
          this.audioFeatures.current.onTrackUpdated(response.item.id)
        }
      }
    )
  }
  render() {
    console.log("YEEEHAAA 2", AudioFeatures)
    // console.log(JSON.stringify(sessionStorage.getItem('sound_features'))
    return (
      <div className="App">
        { (() => {
          if (this.state.loggedIn) {
            return (
              <div className="logout-btn">
                <a href='https://accounts.spotify.com/en/logout '>
                  <Button variant="outline-success" size="sm">
                     Log out
                    </Button>
                </a>
              </div>
            );
          } else {
          return (
            <div>
            <div class="spotify">
              <div class="bar bar-dark"></div>
              <div class="bar bar-med"></div>
              <div class="bar bar-light"></div>
            </div>
              <h1>Please Login Using Spotify</h1>
              <br></br>
              <a href='http://localhost:8888'>
                <Button variant="outline-success" size="lg">
                   Login
                  </Button>
              </a>
            </div>
          );
        }
      })()
    }

      { (() => {
          if (this.state.loggedIn && this.state.nowPlaying.id) {

            return (
              <div>
                <div><h2>Now Playing:</h2> <h5>{ this.state.nowPlaying.name}, &nbsp;{ this.state.nowPlaying.artist}</h5></div>
                <div>
                  <img src={ this.state.nowPlaying.image} style={{ width: 200}}/>
                </div>

                <UserFeatures
                  ref={this.userFeatures}
                  oAuth={this.state.oAuth}
                />
               </div>

              <VisualizerInfo
               id={this.state.nowPlaying.id}
               ref={this.visInfo}
               oAuth={this.state.oAuth}
              />

              <AudioFeatures
               id={this.state.nowPlaying.id}
               ref={this.audioFeatures}
               oAuth={this.state.oAuth}
              />
             </div>
            );
          } else {
            return "No Playback detected";
          }
        })()
      }
    </div>
    )
  }
}


export default App;
