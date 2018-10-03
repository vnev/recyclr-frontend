import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../app/components/Settings.jsx';

describe('Settings component render properly', () => {
    const wrapper = shallow(<Settings />);

    it('Settings page div renders correctly', () => {
        expect(wrapper.find('#contain-settings').exists()).toBe(true);
    });

    it('Change username renders correctly', () => {
        expect(wrapper.find('#change-username').exists()).toBe(true);
    });

    it('Change email form renders correctly', () => {
        expect(wrapper.find('#change-email').exists()).toBe(true);
    });

    it('Delete account form renders correctly', () => {
        expect(wrapper.find('#delete-account').exists()).toBe(true);
    });
});