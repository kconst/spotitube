import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import getKeys from './utils/keys.js';

const preloadedState = {
  auth_keys: {
    spotify: getKeys('spotify'),
    youtube: getKeys('youtube')
  }
};

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}