import React from 'react';
import { shallow } from 'enzyme';
import Progress from '../app/components/Progress.jsx';
import mockAxios from 'jest-mock-axios';



describe('Testing that the social media and the progress page works properly', () => {
    const wrapper = shallow(<Progress />);
    it('Social Media Button renders correctly', () => {
        expect(wrapper.find('#socialButton').exists()).toBe(true);
    });
    it('Renders popup window after click', () => {
        wrapper.find('#socialWrapper').simulate('click');
        expect(wrapper.state('shared')).toBe(true);
    });
    it('Correct Axios calls', () => {
        localStorage.setItem('userid', 'jon');
        expect(mockAxios.get).toHaveBeenCalledWith('http://recyclr.xyz/user/progress/null',  {headers: {"Access-Control-Allow-Origin": "*", "Authorization": "Bearer null"}});
    });
});
