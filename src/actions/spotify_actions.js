import * as CONSTANTS from './../constants.js';

function retrieve(user) {
  return {
    type: CONSTANTS.RETRIEVE_SPOTIFY_PLAYLISTS,
    user,
    playlists: [],
    loading: true,
    timestamp: Date.now()
  }
}

function fail(query, error) {
  return {
    type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_FAIL,
    playlists: [],
    loading: false,
    error: error,
    timestamp: Date.now()
  }
}

function success(query, json) {
  return {
    type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_SUCCESS,
    loading: false,
    playlists: json.items,
    timestamp: Date.now()
  }
}

function getPlaylists(access_token, user = 'kconst') {
  return function (dispatch) {
    // set the search value
    dispatch(retrieve(user));

    return fetch(`//api.spotify.com/v1/users/${user}/playlists`, { headers : { 'Authorization': 'Bearer ' + access_token } })
      .then(response => response.json())
      .then(json => {
          return dispatch(success(user, json));
        },
        error => {
          debugger;
          return dispatch(fail([], error));
        });
  }
}

export {
    retrieve,
    fail,
    success,
    getPlaylists
};