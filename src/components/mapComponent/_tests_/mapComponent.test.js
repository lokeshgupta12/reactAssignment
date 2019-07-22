import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import MapWithADirectionsRenderer from '../index';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme adapter for Jest
Enzyme.configure({ adapter: new Adapter() });

describe('<MapWithADirectionsRenderer /> component', () => {

  it('should match the snapshot', () => {
    const tree = renderer.create(<MapWithADirectionsRenderer direction={true}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

})