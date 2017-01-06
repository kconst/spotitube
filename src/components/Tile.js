import React, { PropTypes, Component } from 'react';

export default class Tile extends Component {
  render() {
    const { name, id, images } = this.props;

    return (
      <li className="Tile" onClick={ () => this.props.select({ name, id, images }) }>
        <img src={ images[0] && images[0].url } alt={ name }/>
        <h2>
          { name }
        </h2>
      </li>
    )
  }
}

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired
};