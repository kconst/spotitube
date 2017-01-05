// Link.react-test.js
import React from 'react';
import Tile from './Tile';
// import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('basic rendering', () => {
  const jsx = <Tile image="http://iscale.iheart.com/catalog/artist/58269?ops=fit(250,0)" name="Metallica" description="they a band"></Tile>,
    //   component = renderer.create(jsx),
      tile = shallow(jsx);
      
      // snapshot check
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

    expect(tile.find('h2').text()).toEqual('Metallica');
});