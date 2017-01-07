import React from 'react';
import Tile from './Tile';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('snapshot comparison', () => {
  const jsx = <Tile images={ [{ url: 'https://i.scdn.co/image/5194f3860bd53aa613edcfc5ef09a995b599f049' }] } name="Trivium"></Tile>,
    component = renderer.create(jsx),
    tile = component.toJSON();
  
  // snapshot check
  expect(tile).toMatchSnapshot();
});

test('it should have an image and a title', () => {
  const jsx = <Tile images={ [{ url: 'https://i.scdn.co/image/5194f3860bd53aa613edcfc5ef09a995b599f049' }] } name="Trivium"></Tile>,
    tile = shallow(jsx);
  
  expect(tile.find('h2').text()).toEqual('Trivium');
  
  expect(tile.find('img').length).toEqual(1);
});