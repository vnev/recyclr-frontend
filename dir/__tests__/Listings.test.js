import React from 'react';
import { shallow } from 'enzyme';
import CreateL from '../app/components/createListing.jsx';
import ListingI from '../app/components/listingItem.jsx';
import mockAxios from 'jest-mock-axios';
import sinon from 'sinon';
import Listing from '../app/components/Listings';

describe('Testing for the createListing feature', () => {
    const wrapper = shallow(<CreateL/>);
    it('Renders properly', () => {
        expect(wrapper.find('#dateIn'));
    });
    it('Creating a new listing works as inteneded', () => {
        var testValues = new FormData();
        wrapper.setState({
            title:'bottles',
            description:'good bottles',
            matType: 'glass',
            matWeight: '34',
            address: '202 S river rd',
            image: '',
            date: '04/12/2019',
        });
        testValues.append('title', 'bottles');
        testValues.append('description', 'good bottles');
        testValues.append('material_type', 'glass');
        testValues.append('material_weight', '34');
        testValues.append('address', '202 S river rd');
        testValues.append('image', '');
        testValues.append('pickup_date_time', '04/12/2019');
        testValues.append('user_id', 'NaN'); //NaN because can't set local storage
        wrapper.find('#listBtn').simulate('click', { preventDefault() {} });
        expect(mockAxios.post).toHaveBeenCalledWith('/listing', testValues);
        mockAxios.mockResponse();
    });
    it('Creating a new listing works as inteneded', () => {
        var testValues = new FormData();
        wrapper.setState({
            title:'bottles',
            description:'good bottles',
            matType: 'glass',
            matWeight: '34',
            address: '202 S river rd',
            image: '',
            date: '04/12/2019',
        });
        testValues.append('title', 'bottles');
        testValues.append('description', 'good bottles');
        testValues.append('material_type', 'glass');
        testValues.append('material_weight', '34');
        testValues.append('address', '202 S river rd');
        testValues.append('image', '');
        testValues.append('pickup_date_time', '04/12/2019');
        testValues.append('user_id', 'NaN'); //NaN because can't set local storage
        wrapper.find('#listBtn').simulate('click', { preventDefault() {} });
        //expect(mockAxios.post).toHaveBeenCalledWith('/listing', testValues);
        mockAxios.mockError();
    });
    it('Title handler check', () => {
        const spy = sinon.spy(CreateL.prototype, 'titleHandler');
        const wrap = shallow(<CreateL/>);
        wrap.find('#titleIn').simulate('change', {target: {value: 'j1'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('Weight handler check', () => {
        const spy = sinon.spy(CreateL.prototype, 'weightHandler');
        const wrap = shallow(<CreateL/>);
        wrap.find('#matWeightIn').simulate('change', {target: {value: 54}});
        expect(spy.calledOnce).toBe(true);
    });
    it('type handler check', () => {
        const spy = sinon.spy(CreateL.prototype, 'typeHandler');
        const wrap = shallow(<CreateL/>);
        wrap.find('#matTypeIn').simulate('change', {target: {value: 'Compost'}}); 
        expect(spy.calledOnce).toBe(true);
    });
});

describe('Tests for listingItem', () => {
    let item = {
        distance:53,
        company_name: 'Joes',
        company_rating: 5,
        pickup_date_time: '04/12/2019',
        material_type: 'metal',
        material_weight: 45,
        img_hash: '4l3kjlj',
        username: 'jon',
        listing_id: '54',
    }
    const w = shallow(<ListingI Item={item} ButBool={true}/>);
    it('Listing Item renders properly', () => {
        expect(w.find('#overallC').exists()).toBe(true);
    });
    it('Unfreeze works properly', () => {
        const l = shallow(<ListingI Item={item} ButBool={false}/>);
        l.find('#unfreezeBtn').simulate('click');
        expect(mockAxios.get).toHaveBeenCalledWith( "/user/null");
        mockAxios.mockResponse();
    });
     it('Delete check', () => {
        window.localStorage.setItem('userid', 12);
         let item2 = {
             distance:53,
             company_rating: 5,
             pickup_date_time: '04/12/2019',
             material_type: 'metal',
             material_weight: 45,
             img_hash: '4l3kjlj',
             username: 'jon',
             listing_id: '54',
             frozen_by: 0,
             user_id: 12,
         }
         const t = shallow(<ListingI Item={item2} ButBool={false}/>);
         t.find('#dBtn').simulate('click');
         expect(mockAxios.get).toHaveBeenCalledWith('/listing/delete/54');
         mockAxios.mockResponse();
     });
     it('Delete Error check', ()  => {
        window.localStorage.setItem('userid', 12);
         let item2 = {
             distance:53,
             company_rating: 5,
             pickup_date_time: '04/12/2019',
             material_type: 'metal',
             material_weight: 45,
             img_hash: '4l3kjlj',
             username: 'jon',
             listing_id: '54',
             frozen_by: 0,
             user_id: 12,
         }
         const t = shallow(<ListingI Item={item2} ButBool={false}/>);
         t.find('#dBtn').simulate('click');
         mockAxios.mockError();
    }); 
    it('Transaction complete', () => {
        window.localStorage.setItem('is_company', true);
        let item2 = {
            frozen_by: true,
            company_rating: 5,
            
        }
        const t = shallow(<ListingI Item={item2} ButBool={false}/>);
        t.find('#completeBtn').simulate('click');
        mockAxios.mockResponse();

    });
    it('Transaction complete error check', () => {
        window.localStorage.setItem('is_company', true);
        let item2 = {
            frozen_by: true,
            company_rating: 5,
            
        }
        const t = shallow(<ListingI Item={item2} ButBool={false}/>);
        t.find('#completeBtn').simulate('click');
        mockAxios.mockError();
    });
});

describe('Testing for the listing page', () => {
    const wrapper = shallow(<Listing/>);
    it('renders properly', () => {
        expect(wrapper.find('#lContain').exists()).toBe(true);
    });
    it('MatHandle check', () => {      
        const spy = sinon.spy(Listing.prototype, 'matHandle');
        const spy2 = sinon.spy(Listing.prototype, 'matChange');
        const w = shallow(<Listing/>);
        w.find('#matH').simulate('change', {target: {value: 'metal'}}); 
        expect(spy.calledOnce).toBe(true);
        expect(spy2.calledOnce).toBe(true);
    }); 
    it('typeHandle check', () => {      
        const spy = sinon.spy(Listing.prototype, 'typeHandle');
        const w = shallow(<Listing/>);
        w.find('#tH').simulate('change', {target: {value: 'A'}}); 
        expect(spy.calledOnce).toBe(true);
    });
    it('distHandle check', () => {      
        const spy = sinon.spy(Listing.prototype, 'distHandle');
        const w = shallow(<Listing/>);
        w.find('#dH').simulate('change', {target: {value: '10'}}); 
        expect(spy.calledOnce).toBe(true);
    });  
});