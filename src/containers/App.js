import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { spotifyActions, youtubeActions, keysActions } from './../actions';

import Tile from '../components/Tile';
import Tiles from '../components/Tiles';
import TrackSelect from '../components/TrackSelect';
import YouTubeClip from '../components/YouTubeClip';

import * as CONSTANTS from './../constants.js';

import './../styles/global.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }
  
  getPlaylists() {
    this.props.dispatch(spotifyActions.getData({
      type: CONSTANTS.RETRIEVE_SPOTIFY_PLAYLISTS,
      access_token: this.props.auth_keys.spotify.access_token
    }));
  }
  
  selectPlaylist() {
    return args => {
      this.props.dispatch(spotifyActions.getData({
        images: args.images,
        name: args.name,
        id: args.id,
        type: CONSTANTS.RETRIEVE_SPOTIFY_PLAYLIST,
        access_token: this.props.auth_keys.spotify.access_token
      }));
    }
  }
  
  selectTrack() {
    return track => {
      this.props.dispatch(youtubeActions.getVideos({
        query: track,
        type: CONSTANTS.RETRIEVE_YOUTUBE_VIDEOS,
        access_token: this.props.auth_keys.youtube.access_token
      }));
    }
  }
  
  componentWillMount() {
    if (!this.props.auth_keys.spotify || !this.props.auth_keys.youtube) {
      this.props.dispatch(keysActions.getData(this.props.auth_keys));
    }
  }

  render() {
    return (
      <div className="App">
        { (() => {
          if (!this.props.spotify_playlist.id) {
            return <button onClick={ this.getPlaylists.bind(this) }>Get Playlists</button>
          } else {
            return <button onClick={ () => this.props.dispatch(spotifyActions.invalidate()) }>Back to Playlists</button>
          }
        })() }
        
        { (() => {
          if (this.props.spotify_playlist.playlist && this.props.spotify_playlist.playlist.items.length > 0) {
            return <section className="Album">
              <Tile images={ this.props.spotify_playlist.playlist.images } name={ this.props.spotify_playlist.playlist.name }/>
              <TrackSelect select={ this.selectTrack() } tracks={ this.props.spotify_playlist.playlist.items }/>
              <YouTubeClip data={ this.props.youtube_videos }/>
            </section>;
          } else if (this.props.spotify_playlists.playlists && this.props.spotify_playlists.playlists.length > 0) {
            return <Tiles select={ this.selectPlaylist() } data={ this.props.spotify_playlists.playlists }/>
          }
        })() }
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth_keys, spotify_playlist, spotify_playlists, youtube_videos } = state;

  return {
    auth_keys,
    spotify_playlist,
    spotify_playlists,
    youtube_videos
  }
}

export default connect(mapStateToProps)(App);