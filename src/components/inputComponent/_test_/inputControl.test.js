import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import InputControl from '../index';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme adapter for Jest
Enzyme.configure({ adapter: new Adapter() });

describe('<InputControl /> component', () => {

  it('should match the snapshot', () => {
    const tree = renderer.create(<InputControl />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the HTML Correctly', () => {
    const wrapper = shallow(<InputControl />);

    expect(wrapper.find('input').length).toBe(1);
  });
})