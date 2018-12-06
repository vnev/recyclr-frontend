import React from 'react'
import ListingItem from './listingItem'
import history from './history.js'
import axios from 'axios'
import { CheckBox } from 'react'
import api from './api.js'

/*Listings component is a browse/search page for all currently unfrozen listings*/
export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: '5',
            list: [],
            distList: [],
            userAddr: '',
            mat: 'All',
            type: 'A',
            checked: false,
        }
        this.distHandle = this.distHandle.bind(this);
        this.matHandle = this.matHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        this.matChange = this.matChange.bind(this);


    }
    matHandle(event) {
        this.setState({
            mat: event.target.value,
        }, () => this.sortHandle());

    }
    typeHandle(event) {
        this.setState({
            type: event.target.value,
        }, () => this.sortHandle());
    }
    sortHandle() {
        this.setState({ distList: this.state.list });
        this.matChange();


    }
    matChange() {
        let mat = this.state.mat;
        let newList = this.state.list;
        if (mat === 'All') {

        }
        else {
            newList = newList.filter((data) => data.material_type === mat);
        }
        if (this.state.type === 'A') {
            newList = newList.sort(function (a, b) { return a.distance - b.distance });
        }
        else {
            newList = newList.sort(function (a, b) { return a.distance - b.distance });
            newList.reverse();
        }
        let rad = this.state.radius;
        console.log(newList);
        newList = newList.filter((data) => data.distance <= parseFloat(rad) || parseFloat(rad) > 25);
        console.log(newList);
        this.setState({ distList: newList });
    }
    distHandle(event) {
        this.setState({
            radius: event.target.value,
        }, () => this.sortHandle());

    }
    distancePut() {
        let _this = this
        return new Promise((resolve, reject) => {
            let newList = this.state.list.filter(function (data) {
                if (data.distance <= parseFloat(_this.state.radius) || parseFloat(_this.state.radius) >= 25) {
                    return data;
                }
            });

            resolve(newList);
        });

    }
    /*The features of this page allow filtering listings by the type of material and listings being sold within a certain radius*/
    filterList() {
        let _this = this;
        this.gatherDistances().then(function () {
            _this.distancePut().then(function (data2) {
                _this.setState({
                    distList: data2,
                }, () => _this.sortHandle());

            });
        });
    }
    gatherDistances() {
        return new Promise((resolve, reject) => {
            let promiseArr = [];
            for (let i = 0; i < this.state.list.length; i++) {
                promiseArr.push(this.updateList(this.state.list[i]));
            }
            Promise.all(promiseArr).then(data => resolve());
        });
    }
    updateList(data) {
        return new Promise((resolve, reject) => {
            if (!data.distance) {
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
                    if (distance === undefined) {
                        resolve();
                    }
                    var distance_text = distance.text;
                    var miles = distance_text.substring(0, distance_text.length - 3);
                    data.distance = parseFloat(miles);
                    resolve();
                });
            }
        });
    }
    componentDidMount() {
        if (window.localStorage.getItem('username') === null || window.localStorage.getItem('is_company') === 'false') {
            history.push('/auth');
        }
        let _this = this;
        api.get(`/user/${window.localStorage.getItem('userid')}`)
            .then(function (result) {
                if (result.data.is_company === false) {
                    //history.push('/auth');
                }
                else {
                    _this.setState({
                        userAddr: `${result.data.address}, ${result.data.city} ${result.data.state}`,
                    });
                }
                api.get("/listings")
                    .then(function (result) {
                        console.log(result);
                        _this.setState({ list: result.data }, () => {
                            _this.filterList()
                        });

                    });
            });
        //make get request using stored email/username


        //set list = returned json objects list = results.data
    }
    render() {
        return (
            <div id="lContain" className="container">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Listings</h3>
                        <p className="text-center">View listings within a specified radius</p>
                        <div className="row" style={{ marginBottom: "10px" }}>
                            <div className="col-4">
                                <select id="tH" className="custom-select" value={this.state.type} onChange={this.typeHandle}>
                                    <option value='A'>Ascending</option>
                                    <option value='D'>Descending</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select id="matH" className="custom-select" value={this.state.mat} onChange={this.matHandle}>
                                    <option value="All">All</option>
                                    <option value='Plastic'>Plastic</option>
                                    <option value='Electronics'>Electronics</option>
                                    <option value='Rubber'>Rubber</option>
                                    <option value='Textiles'>Textiles</option>
                                    <option value='Cardboard'>Cardboard</option>
                                    <option value='Glass'>Glass</option>
                                    <option value='Metal'>Metal</option>
                                    <option value='Compost'>Compost</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select id="dH" className="custom-select" value={this.state.raduis} onChange={this.distHandle}>
                                    <option value='5'>5 Miles</option>
                                    <option value='10'>10 Miles</option>
                                    <option value='25'>25 Miles</option>
                                    <option value='26'>More than 25 Miles</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.distList.map((item, key) => {
                                return <ListingItem key={key} Item={item} ButBool={true} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
