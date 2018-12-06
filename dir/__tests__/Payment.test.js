import React from 'react';
import { shallow, mount } from 'enzyme';
import mockAxios from 'jest-mock-axios';
import Payment from '../app/components/Payment.jsx';
import CurrPrices from '../app/components/currPrices.jsx';
import CardSec from '../app/components/CardSection.jsx';
import PayI from '../app/components/PayItem.jsx';
import sinon from 'sinon';


describe('Testing for the payment page and pages associated with it', () => {
    const wrapper = shallow(<Payment/>);
    it('Renders properly', () => {
        expect(wrapper.find('#incetBtn').exists()).toBe(true);
    });
    it('Applys incentive points correctly', () => {
        let requestObj = {
            points: 10,
        };
        let userObj = {
            points: 15,
        };
        wrapper.setState({
            userObj: userObj,
            incentivePoints: 5,
        });
        wrapper.find('#incetBtn').simulate('click');
        expect(mockAxios.put).toHaveBeenCalledWith(`http://recyclr.xyz/user/null`, requestObj ,  { headers: { 'Authorization': 'Bearer null', } })
    });
    it('CardSec renders properly', () => {
        const w = shallow(<CardSec/>);
        expect(w.find('#cardClass').exists()).toBe(true);
    });
    it('PayItem Renders properly', () => {
        let props = {
            created_at: '04/12/2018',
            price: 56
        }
        const l = shallow(<PayI Item={props}/>);
        expect(l.find('#cardR').exists()).toBe(true);
    });

    it('Component did mount is called', () => {
        const wrapp = shallow(<Payment/>);
        expect(mockAxios.get).toHaveBeenCalledWith('http://recyclr.xyz/user/null', { headers: { 'Authorization': 'Bearer null', 'Access-Control-Allow-Origin': '*' } });
    });
});

describe('Testing for the current prices page', () => {
    const wrap = shallow(<CurrPrices/>);
    it('renders properly', () => {
        expect(wrap.find('#card').exists()).toBe(true);
    });
});