import React from 'react';
import { shallow } from 'enzyme';
import CreateL from '../app/components/createListing';

describe('Testing for the checkout feature', () => {
    const wrapper = shallow(<CreateL/>);
    it('Renders properly', () => {
        expect(wrapper.find('#dateIn'));
    });
    it('Creating a new listing works as inteneded', () => {
        var testValues = { 
            title: 'bottles', description: 'good bottles', matType: 'glass', matWeight: '45',
            image:'', address: '202 S river rd', date:'03/15/2019', imagePreviewUrl:''
        };
        wrapper.find('#listBtn').simulate('click');
    });
});