import React from 'react'
import ListingItem from './listingItem'
import history from './history.js'
import axios from 'axios'


export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: '5',
            list: [],
            distList: [],
            userAddr: '',
        }
        this.distHandle = this.distHandle.bind(this);
    }
    distHandle(event) {
        this.setState({
            radius: event.target.value,
        });
        this.filterList();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    distancePut() {
        let _this = this
        return new Promise((resolve, reject) => {
            let newList = this.state.list.filter(function(data) {
                if (data.distance <= parseFloat(_this.state.radius) || parseFloat(_this.state.radius) >= 25) {
                    return data;
                }
            });

            resolve(newList);
        });
        
    }
    filterList() {
        let _this = this;
        this.gatherDistances().then(function() {
            _this.distancePut().then(function(data2) {
                _this.setState({
                    distList: data2,
                });
                
            });
        });
    }
    gatherDistances() {
        return new Promise((resolve, reject) => {
            let promiseArr = [];
            for (let i = 0; i < this.state.list.length; i++) {
                promiseArr.push(this.updateList(this.state.list[i]));
            }
            Promise.all(promiseArr).then(function(data) {
                resolve();
            });
        });
    }
    updateList(data) {
        return new Promise((resolve, reject) => {
            if (!data.distance){
                var origin = `${this.state.userAddr}`;
                var destination = `${data.address}`;
                var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [origin],
                        destinations: [destination],
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                        avoidHighways: false,
                        avoidTolls: false
                    }, (response, status) => {
                        var distance = response.rows[0].elements[0].distance;
                        var distance_text = distance.text;
                        var miles = distance_text.substring(0, distance_text.length - 3);
                        data.distance = parseFloat(miles);
                        resolve();
                    });   
            }   
        });
    }
    componentDidMount() {
        if (window.localStorage.getItem('username') === null) {
            history.push('/auth');
        }
        let _this = this;
        axios.get(`http://recyclr.xyz/user/${window.localStorage.getItem('userid')}`, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            if(result.data.is_company === false) {
                //history.push('/auth');
            }
            else {
                _this.setState({
                    userAddr: `${result.data.address}, ${result.data.city} ${result.data.state}`,
                });
            }
            axios.get("http://recyclr.xyz/listings",{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
            .then(function(result) {
                _this.setState({list: result.data}, () => {
                    _this.filterList()
                });
                
            });
        });
        //make get request using stored email/username
       
        
        //set list = returned json objects list = results.data
    }
    render() {
        return(
            <div className="container">
                <div className="card">
                    <select className="custom-select" onChange={this.distHandle}>
                        <option value='5'>5 Miles</option>
                        <option value='10'>10 Miles</option>
                        <option value='25'>25 Miles</option>
                        <option value='26'>More than 25 Miles</option>
                    </select>
                    {this.state.distList.map((item,key) => {
                        return <ListingItem key={key} Item={item} ButBool={true}/>
                    })}
                </div>
            </div>
        );
    }


}