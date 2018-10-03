import React from 'react';
import { shallow } from 'enzyme';

import App from '../app/components/App'

it('Renders correctly' , () => {
    const wrapper = shallow (<App />);

    expect(wrapper.find('#appBase').exists()).toBe(true);
});