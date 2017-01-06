import React, { PropTypes, Component } from 'react';

export default class TrackSelect extends Component {
  render() {
    return (
      <select multiple onChange={ (e) => this.props.select(e.currentTarget.options[e.currentTarget.selectedIndex].value) }>
        { (() => {
          if (this.props.tracks.length > 0) {
            return this.props.tracks.map((e, i) =>
              <option
                key={ i }
                value={ e.track.artists[0].name + ' - ' + e.track.name }>
                  { e.track.name }
                </option>
            )
          } else {
            return <h4>No results were found from your query.</h4>;
          }
        })() }
      </select>
    )
  }
}

TrackSelect.propTypes = {
  tracks: PropTypes.array.isRequired
};