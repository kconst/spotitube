function retrieve(user) {
  return {
    type: RETRIEVE_YOUTUBE_VIDEOS,
    videos: [],
    loading: true,
    user,
    timestamp: Date.now()
  }
}

function fail(query, error) {
  return {
    type: RECEIVE_YOUTUBE_VIDEOS_FAIL,
    videos: [],
    loading: false,
    error: error,
    timestamp: Date.now()
  }
}

function success(query, json) {
  return {
    type: RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
    loading: false,
    videos: json,
    timestamp: Date.now()
  }
}

function getVideos(token, user = 'kconst') {
  return function (dispatch) {
    // set the search value
    dispatch(retrieve(user));

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

export {
    retrieve,
    fail,
    success,
    getVideos
};