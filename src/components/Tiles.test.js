import React from 'react';
import Tiles from './Tiles';
import Tile from './Tile';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const data = [
    {
      id: "3xIOCwSEW9WdW5auFWBJfw",
      images: [
        { url: "https://i.scdn.co/image/68282faa891fba544f90e32cfcee6e23ff2b6d1c" }
      ],
      name: "St. Lucia – Spotify Sessions"
    },
    {
      id: "5f9AduFWkiRl4XjNsiIvyh",
      images: [
        { url: "https://i.scdn.co/image/ed46b9b221b4e19da42c4adf8f4db6c649339fe9" }
      ],
      name: "Megadeth – ENDGAME"
    }
  ],
  jsx = <Tiles data={ data }></Tiles>;

test('snapshot comparison', () => {
  const component = renderer.create(jsx),
    tile = component.toJSON();
  
  // snapshot check
  expect(tile).toMatchSnapshot();
});

test('it should have multiple tiles', () => {
  const tiles = shallow(jsx);
  
  expect(tiles.find('Tile').length).toEqual(2);
});