import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { spotifyActions, youtubeActions } from './../actions';
import Tiles from '../components/Tiles';

import './../styles/global.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  getPlaylists() {
    this.props.dispatch(spotifyActions.getPlaylists(this.props.auth_keys.spotify.access_token));
  }

  render() {
    return (
      <div className="App">
        <button onClick={ this.getPlaylists.bind(this) }>Get Playlists!</button>
        
        { (() => {
          if (this.props.spotify_playlists.playlists && this.props.spotify_playlists.playlists.length > 0) {
            return <Tiles data={ this.props.spotify_playlists.playlists }/>
          }
        })() }
      </div>
    )
  }
}

App.propTypes = {
  /*results: PropTypes.array.isRequired,*/
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth_keys, spotify_playlists, youtube_videos } = state;

  return {
    auth_keys,
    spotify_playlists,
    youtube_videos
  }
}

export default connect(mapStateToProps)(App);