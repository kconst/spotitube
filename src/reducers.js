import { combineReducers } from 'redux';
import * as CONSTANTS from './constants.js'

/*function searchQuery(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTISTS_FAIL:
    case RECEIVE_ARTISTS_SUCCESS:
    case SEARCH_ARTIST:
      return Object.assign({}, {
        loading: action.loading,
        query: action.query || state.query,
        type: action.type
      });

    default:
      return state;
  }
}

function results(list = [], action) {
  switch (action.type) {
    case CONSTANTS.RECEIVE_ARTISTS_FAIL:
    case CONSTANTS.RECEIVE_ARTISTS_SUCCESS:
      return action.results.slice();

    default:
      return list;
  }
}*/

function spotify_playlists(list = [], action) {
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
      return list;
  }
}

function youtube_videos(list = [], action) {
  switch (action.type) {
    case CONSTANTS.RETRIEVE_YOUTUBE_VIDEOS:
    case CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_FAIL:
    case CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_SUCCESS:
      return Object.assign({}, {
        loading: action.loading,
        videos: action.videos.slice(),
        type: action.type
      });

    default:
      return list;
  }
}

function auth_keys(keys = {}, action) {
  switch (action.type) {
    case CONSTANTS.SET_KEYS:
    return Object.assign({}, keys);
    
    default:
      return keys;
  }
}

const rootReducer = combineReducers({
  auth_keys,
  spotify_playlists,
  youtube_videos
});

export default rootReducer