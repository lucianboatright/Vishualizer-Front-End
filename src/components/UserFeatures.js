import React, { Component } from 'react';
import './App.css';


class UserFeatures extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onTrackUpdated(track) {
    const spotifyURL = "https://api.spotify.com/v1/me/"
    fetch(spotifyURL , {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.oAuth
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        user: localStorage.getItem('user_id'),
        userFeatures: response,
      })
      console.log("USER INFO RESPONSE 1", response)
    })
  }
  componentDidMount() {
    this.onTrackUpdated(this.props.track);
  }

  render() {
    if (!this.state.userFeatures) {
      return <div className="thisdiv"></div>
    }
    return (
    <div className="UserFeatures">
        <div className="userFeatures-rendered"> <h3>Welcome { this.state.userFeatures.display_name }, { this.state.userFeatures.country }</h3></div>
    </div>
    )
  }
}

export default UserFeatures;
