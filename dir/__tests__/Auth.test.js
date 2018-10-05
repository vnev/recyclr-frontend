import React from 'react';
import { shallow } from 'enzyme';
import Auth from '../app/components/Authentication.jsx';

//Will have to be adjusted once final code for this is complete

describe('Tests for the Authentication components', () => {

    it('Authentication page renders correctly', () => {
        const wrapper = shallow(<Auth />);
        expect(wrapper.find('.card-title').exists()).toBe(true);
    });

    it('Correctly switches from sign in to sign up', () => {
        const wrapper = shallow(<Auth />);
        console.log(wrapper.state('signinTog'));
        expect(wrapper.find('#signinHeading').exists()).toBe(true);
        wrapper.setState({ signinTog : 'false'});
        console.log(wrapper.state('signinTog'));
        expect(wrapper.find('#signUpHeading').exists()).toBe(true);
    });
});