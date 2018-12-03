import React from 'react';
import { shallow } from 'enzyme';
import Progress from '../app/components/Progress.jsx';
import { expect } from 'chai';

describe('Testing that the social media works properly', () => {
    const wrapper = shallow(<Progress />);
    it('Social Media Button renders correctly', () => {
        expect(wrapper.find('#socialButton')).to.exist;
    });
    it('Renders popup window after click', () => {
        wrapper.find('#socialWrapper').simulate('click');
        expect(wrapper.state('shared')).equal(true);
    });
});
