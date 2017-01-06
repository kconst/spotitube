import { combineReducers } from 'redux';
import * as CONSTANTS from './constants.js'

function spotify_playlist(state = { id: null }, action) {
  switch (action.type) {
    case CONSTANTS.INVALIDATE_SPOTIFY_PLAYLIST:
    case CONSTANTS.RETRIEVE_SPOTIFY_PLAYLIST:
    case CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_FAIL:
    case CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_SUCCESS:
      return Object.assign({}, {
        loading: action.loading,
        id: action.id,
        playlist: action.playlist,
        type: action.type
      });

    default:
      return state;
  }
}

function spotify_playlists(state = {}, action) {
  switch (action.type) {
    case CONSTANTS.RETRIEVE_SPOTIFY_PLAYLISTS:
    case CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_FAIL:
    case CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_SUCCESS:
      return Object.assign({}, {
        loading: action.loading,
        playlists: action.playlists.slice(),
        type: action.type
      });

    default:
      return state;
  }
}

function youtube_videos(state = { videos: [] }, action) {
  switch (action.type) {
    case CONSTANTS.RETRIEVE_YOUTUBE_VIDEOS:
    case CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_FAIL:
    case CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_SUCCESS:
      return Object.assign({}, {
        loading: action.loading,
        videos: action.videos.items.slice(),
        type: action.type
      });

    default:
      return state;
  }
}

function auth_keys(keys = {}, action) {
  switch (action.type) {
    case CONSTANTS.RETRIEVE_KEYS:
    case CONSTANTS.GET_KEYS_SUCCESS:
    case CONSTANTS.GET_KEYS_FAIL:
    return Object.assign(keys, {
      spotify: action.spotify || keys.spotify,
      youtube: action.youtube || keys.youtube
    });
    
    default:
      return keys;
  }
}

const rootReducer = combineReducers({
  auth_keys,
  spotify_playlists,
  spotify_playlist,
  youtube_videos
});

export default rootReducer