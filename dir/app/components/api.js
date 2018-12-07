import axios from 'axios'


export default axios.create({
    baseURL: 'http://recyclr.xyz/api',
    headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
    }
});