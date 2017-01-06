import * as CONSTANTS from './../constants.js';

function retrieve() {
  return {
    type: CONSTANTS.RETRIEVE_KEYS,
    keys: null,
    loading: true,
    timestamp: Date.now()
  }
}

function fail(args) {
  return {
    type: CONSTANTS.GET_KEYS_FAIL,
    keys: null,
    loading: false,
    error: args.error,
    timestamp: Date.now()
  }
}

function success(args) {
  return {
    type: CONSTANTS.GET_KEYS_SUCCESS,
    loading: false,
    keys: args.keys,
    timestamp: Date.now()
  }
}

function getData(args) {
  return function (dispatch) {
    dispatch(retrieve());

    if (!args.spotify) {
      location.href = 'https://spotitube-kconst.c9users.io:8080/login_spotify';
    }
    
    if (!args.youtube) {
      location.href = 'https://spotitube-kconst.c9users.io:8080/login_youtube';
    }

    return dispatch(success);
  }
}

export {
    retrieve,
    fail,
    success,
    getData
};