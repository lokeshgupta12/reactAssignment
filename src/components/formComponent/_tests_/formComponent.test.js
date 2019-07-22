import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import FormComponent from '../index';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme adapter for Jest
Enzyme.configure({ adapter: new Adapter() });

describe('<FormComponent /> component', () => {

  it('should match the snapshot', () => {
    const tree = renderer.create(<FormComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the HTML Correctly', () => {
    const wrapper = shallow(<FormComponent />);

    expect(wrapper.find('div').length).toBe(4);
  });

  it('should render the HTML Correctly', () => {
    const wrapper = shallow(<FormComponent />);

    expect(wrapper.find('InputControl').length).toBe(2);
  });

  it('should render the HTML Correctly', () => {
    const wrapper = shallow(<FormComponent />);

    expect(wrapper.find('button').length).toBe(2);
  });
})