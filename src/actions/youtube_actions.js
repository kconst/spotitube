function retrieve(query, error) {
  return {
    type: RETRIEVE_YOUTUBE_PLAYLISTS,
    playlists: [],
    loading: true,
    error: error,
    timestamp: Date.now()
  }
}

function fail(query, error) {
  return {
    type: RECEIVE_YOUTUBE_PLAYLISTS_FAIL,
    playlists: [],
    loading: false,
    error: error,
    timestamp: Date.now()
  }
}

function success(query, json) {
  return {
    type: RECEIVE_YOUTUBE_PLAYLISTS_SUCCESS,
    loading: false,
    playlists: json,
    timestamp: Date.now()
  }
}

function get(user, token) {
  return function (dispatch) {
    // set the search value
    // dispatch(searchArtist(artist));

    return fetch(`//api.youtube.com/v1/users/${user}/playlists`)
      .then(response => response.json())
      .then(json => {
        debugger;
          return dispatch(success(user, json));
        },
        error => {
          debugger;
          return dispatch(fail([], error));
        });
  }
}

export default {
    retrieve,
    fail,
    success,
    get
};