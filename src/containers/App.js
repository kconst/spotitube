import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchArtists } from './../actions';
import Tiles from '../components/Tiles';

import './../styles/global.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        
      </div>
    )
  }
}

App.propTypes = {
  /*results: PropTypes.array.isRequired,*/
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth_keys, searchQuery, results } = state;

  return {
    auth_keys: auth_keys,
    searchQuery: searchQuery,
    results: results
  }
}

export default connect(mapStateToProps)(App);