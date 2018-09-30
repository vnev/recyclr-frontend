import React from 'react';
import { shallow } from 'enzyme';

import App from '../app/components/App.jsx'

it('Renders correctly' , () => {
    const wrapper = shallow (<App />);

    expect(wrapper.find('#appBase'));
});