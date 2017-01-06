import React, { PropTypes, Component } from 'react';

export default class Tile extends Component {
  render() {
    const { name, description, images } = this.props;

    return (
      <li className="Tile">
        <img src={ images[0] && images[0].url } alt={ name }/>
        <h2>
          { name }
        </h2>

        <p>
          { description }
        </p>
      </li>
    )
  }
}

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};