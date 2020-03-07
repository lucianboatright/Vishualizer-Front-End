import React, { Component } from 'react';
import './App.css';
import AudioFeatures from './AudioFeatures';
import Spotify from 'spotify-web-api-js';

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
          console.log('response', response)
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
    return (
      <div className="App">
        { (() => {
          if (this.state.loggedIn) {
            return (
              <div className="authentication">
                <a href='https://accounts.spotify.com/en/logout '>
                  <button>Logout</button>
                </a>
              </div>
            );
          } else {
          return (
            <div>
              <h1>Please Login Using Spotify</h1>
              <br></br>
              <a href='http://localhost:8888'>
                <button>Login</button>
              </a>
            </div>
          );
        }
      })()
    }

      { (() => {
          if (this.state.nowPlaying.id) {

            return (
              <div>
                <div> Now Playing: { this.state.nowPlaying.name} </div>
                <div> By: { this.state.nowPlaying.artist} </div>
                <div> Id: { this.state.nowPlaying.id} </div>
                <div> Progress: { this.state.nowPlaying.progress} </div>
                <div>
                  <img src={ this.state.nowPlaying.image} style={{ width: 100}}/>
                </div>
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
