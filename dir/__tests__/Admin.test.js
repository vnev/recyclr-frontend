import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import Admin from '../app/components/Admin.jsx';
import Home from '../app/components/Home.jsx';

describe('Testing for the admin page and homepage', () => {
    const wrapper = shallow(<Admin/>)
    it('renders properly', () => {
        expect(wrapper.find('#banBtn').exists()).toBe(true);
    });
    it('Ban user works properly', () => {
        wrapper.setState({userToBan: 'jon'});
        wrapper.find('#banBtn').simulate('click');
        expect(mockAxios.get).toHaveBeenCalledWith('http://recyclr.xyz/user/jon/ban')
    });
    it('home renders properly', () => {
        const l = shallow(<Home/>);
        expect(l.find('#classN').exists()).toBe(true);
    });
});