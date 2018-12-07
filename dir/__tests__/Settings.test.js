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
        expect(mockAxios.put).toHaveBeenCalledWith('/user/null', newObj);
        mockAxios.mockResponse();
    });
    it('Change email error works properly', () => {
        let newObj = {
            email: "1@gmail.com",
        }
        wrapper.setState({
            newEmail: "1@gmail.com"
        });
        wrapper.find('#emailBtn').simulate('click');
        mockAxios.mockError(newObj);
    });
    it('Change password works properly', () => {
        let newObj = {
            passwd: "1"
        }
        wrapper.setState({
            newPass: "1"    
        });
        wrapper.find('#passBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith('/user/null', newObj);
        mockAxios.mockResponse();
    });
    it('Change password error works properly', () => {
        let newObj = {
            passwd: "1"
        }
        wrapper.setState({
            newPass: "1"    
        });
        wrapper.find('#passBtn').simulate('click');
        mockAxios.mockError();
    });
    it('Change username works properly', () => {
        let newObj = {
            name: "1"
        }
        wrapper.setState({
            newUsername: "1"    
        });
        wrapper.find('#usernBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith('/user/null', newObj)
        mockAxios.mockResponse();
    });
    it('Change username error works properly', () => {
        let newObj = {
            name: "1"
        }
        wrapper.setState({
            newUsername: "1"    
        });
        wrapper.find('#usernBtn').simulate('click');
        mockAxios.mockError();
    });
    it('Delete works properly', () => {
        wrapper.find('#deleteBtn').simulate('click');
        expect(mockAxios.get).toHaveBeenCalledWith('/user/null/delete');
        mockAxios.mockResponse();
    });
    it('Delete error works properly', () => {
        wrapper.find('#deleteBtn').simulate('click');
        mockAxios.mockError();
    });

    it('Passhandle check', () => {
        wrapper.find('#pH').simulate('change', {target: {value: 'bob'}}); 
    });
    it('usernameHandle check', () => {
        wrapper.find('#uH').simulate('change', {target: {value: 'bob'}}); 
    });
    it('emailHandle check', () => {
        wrapper.find('#eH').simulate('change', {target: {value: 'bob'}}); 
    });  
});