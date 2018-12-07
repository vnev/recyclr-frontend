import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import Admin from '../app/components/Admin.jsx';
import Home from '../app/components/Home.jsx';
import sinon from 'sinon';

describe('Testing for the admin page and homepage', () => {
    const wrapper = shallow(<Admin/>)
    it('renders properly', () => {
        expect(wrapper.find('#banBtn').exists()).toBe(true);
    });
    it('Ban user works properly', () => {
        wrapper.setState({userToBan: 'jon'});
        wrapper.find('#banBtn').simulate('click');
        let obj = {
            data: 45
        }
        //mock.onGet('/user/jon/ban').reply(200);
        expect(mockAxios.get).toHaveBeenCalledWith('http://recyclr.xyz/api/user/jon/ban');
        mockAxios.mockResponse(obj);
        
        
    });
    it('Ban user error response', () => {
        wrapper.setState({userToBan: 'jon'});
        wrapper.find('#banBtn').simulate('click');
        let obj = {
            data: 45
        }
        mockAxios.mockError(obj);
    });
    it('home renders properly', () => {
        const l = shallow(<Home/>);
        expect(l.find('#classN').exists()).toBe(true);
    });
    it('change handler', () => {
        wrapper.find('#change').simulate('change', {target: {value: 'bob'}}); 
    });
});