import * as CONSTANTS from './../constants.js';

function retrieve(args) {
  if (args.type === CONSTANTS.RETRIEVE_SPOTIFY_PLAYLIST) {
    return {
      type: CONSTANTS.RETRIEVE_SPOTIFY_PLAYLIST,
      id: args.id,
      playlist: null,
      loading: true,
      timestamp: Date.now()
    }
  } else {
    return {
      type: CONSTANTS.RETRIEVE_SPOTIFY_PLAYLISTS,
      user: args.user,
      playlists: [],
      loading: true,
      timestamp: Date.now()
    }
  }
}

function fail(args) {
  if (args.type === CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_FAIL) {
    return {
      type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_FAIL,
      id: args.id,
      playlist: null,
      loading: false,
      error: args.error,
      timestamp: Date.now()
    }
  } else {
    return {
      type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_FAIL,
      playlists: [],
      loading: false,
      error: args.error,
      timestamp: Date.now()
    }
  }
}

function success(args) {
  if (args.type === CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_SUCCESS) {
    return {
      type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_SUCCESS,
      loading: false,
      id: args.id,
      playlist: args.playlist,
      timestamp: Date.now()
    }
  } else {
    return {
      type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLISTS_SUCCESS,
      loading: false,
      playlists: args.json.items,
      timestamp: Date.now()
    }
  }
}

function getData(args) {
  const user = args.user || 'kconst';
  
  if (args.type === CONSTANTS.RETRIEVE_SPOTIFY_PLAYLIST) {
    return function (dispatch) {
      // set the search value
      dispatch(retrieve({
        type: args.type,
        id: args.id
      }));

      return fetch(`//api.spotify.com/v1/users/${user}/playlists/${args.id}/tracks`, { headers : { 'Authorization': 'Bearer ' + args.access_token } })
        .then(response => response.json())
        .then(json => {
            // add data from selection
            json.images = args.images;
            json.name = args.name;
            
            return dispatch(success({
              id: args.id,
              type: CONSTANTS.RECEIVE_SPOTIFY_PLAYLIST_SUCCESS,
              playlist: json
            }));
          },
          error => {
            debugger;
            return dispatch(fail({
              type: args.type,
              id: args.id,
              error
            }));
          });
    }
  } else {
    return function (dispatch) {
      // set the search value
      dispatch(retrieve({
        type: args.type,
        user
      }));
  
      return fetch(`//api.spotify.com/v1/users/${user}/playlists`, { headers : { 'Authorization': 'Bearer ' + args.access_token } })
        .then(response => response.json())
        .then(json => {
            return dispatch(success({
              type: args.type,
              user,
              json
            }));
          },
          error => {
            debugger;
            return dispatch(fail({
              type: args.type,
              playlists: [],
              error
            }));
          });
    }
  }
}

export {
    retrieve,
    fail,
    success,
    getData
};