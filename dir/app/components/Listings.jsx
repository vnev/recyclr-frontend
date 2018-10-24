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
        }
        this.distHandle = this.distHandle.bind(this);
    }
    distHandle(event) {
        this.setState({
            radius: event.target.value,
        });
        this.updateList();
    }
    updateList() {
        let newList = [];
        for (let i = 0; i < this.state.list.length; i++) {
            var origin = `${window.localStorage.getItem('zipcode')}`;
            var destination = `${this.state.list[i].zipcode}`;
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
                    var distance_value = distance.value;
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    console.log(`Length in miles: ${miles}`);
                    console.log(this.state.radius);
                   if (miles <= this.state.radius || this.state.radius === '26') {
                       let temp = this.state.list[i];
                       temp.distance = miles;
                       newList.push(temp);
                   }
                });
            
        }
        this.setState({
            distList: newList,
        });
    }
    componentDidMount() {
        if (window.localStorage.getItem('username') === null) {
            history.push('/auth');
        }
        let _this = this;
        //make get request using stored email/username
        axios.get("http://recyclr.xyz/listings",{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            console.log(result.data);
            _this.setState({list: result.data});
            _this.updateList();
        });
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
                        return <ListingItem Item={item}/>
                    })}
                </div>
            </div>
        );
    }


}