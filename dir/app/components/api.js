import axios from 'axios'

export default axios.create({
    baseURL: 'http://recyclr.xyz',
    headers: {
        'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
    }
});