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
    filterList() {
        let newList = this.state.list.filter((data) => data.distance <= this.state.radius);
        console.log(newList);
        this.setState({
            distList: newList,
        });
    }
    updateList() {
        let newList = [];
        for (let i = 0; i < this.state.list.length; i++) {
            var origin = `${this.state.userAddr}`;
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
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    if (miles <= this.state.radius || this.state.radius === '26') {
                        let temp = this.state.list[i];
                        temp.distance = miles;
                        newList.push(temp);
                   }
                }); 
        }
        console.log(newList);
        this.setState({
            list: newList,
        }, this.filterList());
        
    }
    componentDidMount() {
        if (window.localStorage.getItem('username') === null) {
            history.push('/auth');
        }
        let _this = this;
        axios.get(`http://recyclr.xyz/user/${window.localStorage.getItem('userid')}`, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            console.log(result);
            if(result.data.is_company === false) {
                //history.push('/auth');
            }
            else {
                _this.setState({
                    userAddr: result.data.city + ' ' + result.data.state,
                });
            }
            axios.get("http://recyclr.xyz/listings",{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
            .then(function(result) {
                _this.setState({list: result.data}, () => _this.updateList());
             
              
                console.log(_this.state.list);
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
                        return <ListingItem Item={item} ButBool={true}/>
                    })}
                </div>
            </div>
        );
    }


}