import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../app/components/Settings.jsx';
import mockAxios from 'jest-mock-axios';

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

    it('Change email works properly', () => {
        let newObj = {
            email: "1@gmail.com",
        }
        wrapper.setState({
            newEmail: "1@gmail.com"
        });
        wrapper.find('#emailBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith('http://recyclr.xyz/user/null', newObj, { headers: { 'Authorization': 'Bearer null' } })
    });
    it('Change password works properly', () => {
        let newObj = {
            passwd: "1"
        }
        wrapper.setState({
            newPass: "1"    
        });
        wrapper.find('#passBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith('http://recyclr.xyz/user/null', newObj, { headers: { 'Authorization': 'Bearer null'} })
    });
    it('Change username works properly', () => {
        let newObj = {
            name: "1"
        }
        wrapper.setState({
            newUsername: "1"    
        });
        wrapper.find('#usernBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith('http://recyclr.xyz/user/null', newObj, { headers: { 'Authorization': 'Bearer null'} })
    });
    it('Delete works properly', () => {
        wrapper.find('#deleteBtn').simulate('click');
        expect(mockAxios.get).toHaveBeenCalledWith('http://recyclr.xyz/user/null/delete')
    });
});