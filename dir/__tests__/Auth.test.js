import React from 'react';
import { shallow } from 'enzyme';
import Auth from '../app/components/Authentication.jsx';
import mockAxios from 'jest-mock-axios';
import GoogleA from '../app/components/googleAuth.jsx';
import sinon from 'sinon';

//Will have to be adjusted once final code for this is complete

describe('Tests for the Authentication components', () => {

    it('Authentication page renders correctly', () => {
        const wrapper = shallow(<Auth />);
        expect(wrapper.find('.card-title').exists()).toBe(true);
    });
    it('Database is called correctly from sign up', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false, 
            email: "1@gmail.com", 
            password:"1", 
            address:"202 S river rd", 
            city: "West Lafayette", 
            state:"Indiana", 
            username: "jon",
            accountType:"f", 
        });
        let data = {
            address:"202 S river rd", 
            user_name:"jon", 
            email: "1@gmail.com",
            passwd: "1",
            is_company:"f",
            city: "West Lafayette",
            state: "Indiana",
        }
        wrapper.find('#signUpBtn').simulate('click');
        expect(mockAxios.post).toHaveBeenCalledWith('/user', data);
        mockAxios.mockResponse();
    });
    it('Testing error response for sign up ', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false, 
            email: "1@gmail.com", 
            password:"1", 
            address:"202 S river rd", 
            city: "West Lafayette", 
            state:"Indiana", 
            username: "jon",
            accountType:"f", 
        });
        let data = {
            address:"202 S river rd", 
            user_name:"jon", 
            email: "1@gmail.com",
            passwd: "1",
            is_company:"f",
            city: "West Lafayette",
            state: "Indiana",
        }
        wrapper.find('#signUpBtn').simulate('click');
        mockAxios.mockError();
    });
    it('Correct Axios call from sign in', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            email: "1@gmail.com", 
            password:"1", 
        });
        let data = {
            email: "1@gmail.com",
            passwd: "1",
        };
        wrapper.find('#loginBtn').simulate('click');
        expect(mockAxios.post).toHaveBeenCalledWith(`/signin`, data);
        mockAxios.mockResponse();
    });
    it('Company signup', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            accountType: 't',
            signinTog: false,
        });
        wrapper.find('#signUpBtn').simulate('click');
        mockAxios.mockResponse();
    });
    it('Company signup error', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            accountType: 't',
            signinTog: false,
        });
        wrapper.find('#signUpBtn').simulate('click');
        mockAxios.mockError();
    });
    it('Testing navLinks', () => {
        const wrapper = shallow(<Auth/>);
        wrapper.find('#navLink1').simulate('click');
        expect(wrapper.find('#signUpHeading').exists()).toBe(true);
        wrapper.find('#navLink2').simulate('click');
        expect(wrapper.find('#signinHeading').exists()).toBe(true);
    });
    it('Email update check ', () => {
        const spy = sinon.spy(Auth.prototype, 'emailHandle');
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#eForm').simulate('change', {target: {value: 'jon@purdue.edu'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('Password update check ', () => {
        const spy = sinon.spy(Auth.prototype, 'passwordHandle');
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#pForm').simulate('change', {target: {value: 'j1'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('User update check ', () => {
        const spy = sinon.spy(Auth.prototype, 'userHandle');
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#uForm').simulate('change', {target: {value: 'j1'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('Type update check ', () => {
        const spy = sinon.spy(Auth.prototype, 'typeHandle');
        const wrapper = shallow(<Auth/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#tForm').simulate('change', {target: {value: 't'}}); 
        expect(spy.calledOnce).toBe(true);
    });
});

describe('Tests for google auth', () => {
    const g = shallow(<GoogleA/>);
    it('Google Auth renders properly', () => {
        expect(g.find('#authRow').exists()).toBe(true);
    });
    it('Handler check', () => {
        const spy = sinon.spy(GoogleA.prototype, 'addressHandle');
        const wrapper = shallow(<GoogleA/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#adH').simulate('change', {target: {value: 't'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('Type check', () => {
        const spy = sinon.spy(GoogleA.prototype, 'typeHandle');
        const wrapper = shallow(<GoogleA/>);
        wrapper.setState({
            signinTog: false,
        });
        wrapper.find('#acH').simulate('change', {target: {value: 't'}}); 
        expect(spy.calledOnce).toBe(true);
    });
});