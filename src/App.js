import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
       }
     }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  componentDidMount() {
    this.Interval = setInterval(
      () => this.getNowPlaying(),
      1000
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
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[1].url,
            artist: response.item.artists[0].name,
            id: response.item.id
          }
        })
      }
    )
  }

  render() {
    return (
    <div className="App">
      <a href='http://localhost:8888'>
      <button>Login But With Spotify </button>
      </a>
      <div> Now Playing: { this.state.nowPlaying.name} </div>
      <div> By: { this.state.nowPlaying.artist} </div>
      <div> Id: { this.state.nowPlaying.id} </div>
      <div>
        <img src={ this.state.nowPlaying.image} style={{ width: 100}}/>
      </div>
    </div>
    )
  }
}

export default App;
