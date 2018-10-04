import React from 'react';
import { shallow } from 'enzyme';
import Progress from 'Progress.jsx';


const wrapper = shallow(<Progress />);
it('Social Media Button renders correctly', () => {
    expect(wrapper.find('#socialBut').exists()).toBe(true);
});
it('Renders popup window after click', () => {
    wrapper.find('#socialBut').props.onClick();
    expect(wrapper.state.shared).toEqual(true);
});
