import * as CONSTANTS from './../constants.js';

function retrieve(query) {
  return {
    type: CONSTANTS.RETRIEVE_YOUTUBE_VIDEOS,
    videos: { items: [] },
    loading: true,
    query,
    timestamp: Date.now()
  }
}

function fail(args) {
  return {
    type: CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_FAIL,
    videos: { items: [] },
    loading: false,
    error: args.error,
    timestamp: Date.now()
  }
}

function success(args) {
  return {
    type: CONSTANTS.RECEIVE_YOUTUBE_VIDEOS_SUCCESS,
    loading: false,
    videos: args.videos,
    timestamp: Date.now()
  }
}

function getVideos(args) {
  return function (dispatch) {
    // set the search value
    dispatch(retrieve(args.query));

    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${args.query}`, { headers : { 'Authorization': 'Bearer ' + args.access_token } })
      .then(response => response.json())
      .then(json => {
          return dispatch(success({
            query: args.query,
            videos: json
          }));
        },
        error => {
          debugger;
          return dispatch(fail({
            error
          }));
        });
  }
}

export {
    retrieve,
    fail,
    success,
    getVideos
};