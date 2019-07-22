import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import LoadingSpinner from '../index';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme adapter for Jest
Enzyme.configure({ adapter: new Adapter() });

describe('<LoadingSpinner /> component', () => {

  it('should match the snapshot', () => {
    const tree = renderer.create(<LoadingSpinner enableLoading={true}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render the HTML Correctly', () => {
    const wrapper = shallow(<LoadingSpinner enableLoading={true}/>);

    expect(wrapper.find('div').length).toBe(3);
  });
})