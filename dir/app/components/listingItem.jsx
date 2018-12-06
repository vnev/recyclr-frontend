import React from 'react';
import ReactDOM from 'react-dom'
import history from './history.js';
import Axios from 'axios';
import api from './api.js';
import toastr from 'toastr';

/*Component for an already created listing. Displays neatly in a rectangular element. Allows for listings to be filtered by certain properties*/
export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
        }
        this.createInvoice = this.createInvoice.bind(this);
        this.freezeListing = this.freezeListing.bind(this);
        this.deleteListing = this.deleteListing.bind(this);
    }
    componentDidMount() {
        // TODO: actually add a "created by" name based on per listing, and not just a singular user's name
        /*let _this = this;
        let userId = this.props.Item.user_id;
        console.log(this.props.Item);
        Axios.get(`http://recyclr.xyz/user/${userId}`, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                _this.setState({
                    name: result.data.name
                });
            });*/

    }

    freezeListing() {
        let obj = {
            company_id: parseInt(window.localStorage.getItem('userid')),
        }
        let _this = this;
        Axios.post(`http://recyclr.xyz/api/listing/freeze/${this.props.Item.listing_id}`, obj, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                console.log(result);
                history.push(`/chatroom/${_this.props.Item.listing_id}`);
            });
    }
    /*A user may unfreeze
    the listing if no agreement is reached to unhide the listing from the page*/
    unfreeze() {
        //call api to unfreeze listing
        api.get(`/listing/unfreeze/${this.props.Item.listing_id}`)
            .then(function (result) {
                console.log(result);
                window.history.go(0);
            });

    }

    deleteListing() {
        /*let obj = {
            user_id: parseInt(window.localStorage.getItem('userid')),
        }*/
        let _this = this;
        Axios.get(`http://recyclr.xyz/api/listing/delete/${this.props.Item.listing_id}`, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                console.log(result);
                window.history.go(0);
            })
    }

    createInvoice() {
        let obj = {
            listing_id: this.props.Item.listing_id,
        }
        api.post(`/invoice/create`, obj).then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        })
        console.log(obj);

    }


    render() {
        console.log(this.props.Item);
        let rightSide;
        let button;
        let dist;
        let frozen;
        if (!this.props.Item.distance) {
            dist = <div></div>
        } else {
            dist = <p><b>Distance</b>: {this.props.Item.distance} miles</p>
        }
        if (!this.props.Item.company_name) {
            frozen = <div><br></br><button id="dBtn" className="btn btn-danger" onClick={this.deleteListing}>Delete Listing</button></div>;
        } else {
            frozen = <div>
                <p style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>Frozen By: <b>{this.props.Item.company_name}</b></p>
                <p>Company Rating: <b>{this.props.Item.company_rating.toFixed(2)} / 5</b></p>
            </div>;
        }
        if (window.localStorage.getItem('is_company') === 'true' && this.props.Item.frozen_by) {
            button = <button className="btn btn-primary" onClick={this.createInvoice}>Transaction Complete</button>
        }
        if (this.props.ButBool === true) {
            rightSide = <div className="col-3 text-right">
                <p style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>By: <b>{this.props.Item.username}</b></p>
                <button style={{ display: "block", width: "100%" }} id="freezeBtn" className="btn btn-primary margin-bottom-2" onClick={this.freezeListing}>Freeze</button>
            </div>;
        }
        else if (this.props.Item.frozen_by != 0) {
            rightSide = <div><button className='btn btn-primary' onClick={() => this.unfreeze(this.props.Item.listing_id)}> Unfreeze Listing</button> <br></br> <br></br>
                <button id="unfreezeBtn" className="btn btn-primary" onClick={() => history.push(`/chatroom/${this.props.Item.listing_id}`)}>Enter Chat</button>
                {frozen}</div>
        }
        let pickup_date_time;
        if (this.props.Item.pickup_date_time) {
            pickup_date_time = <p>{"Desired Pick Up Date: " + (new Date(this.props.Item.pickup_date_time)).toDateString()}</p>
        }
        return (
            <div id="overallC" className="row" style={{ marginBottom: "5px" }}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3">
                                    <img src={this.props.Item.img_hash} height="100" width="100" />
                                </div>
                                <div className="col-6">
                                    <h5>{this.props.Item.title}</h5>
                                    <p>{this.props.Item.description}</p>
                                    {/* <p>{"Desired Pick Up Date: " + (new Date(this.props.Item.pickup_date_time)).toDateString()}</p> */}
                                    {pickup_date_time}
                                    {dist}
                                    <p><b>Weight</b>: {this.props.Item.material_weight} lbs, <b>Type</b>: {this.props.Item.material_type}</p>
                                </div>
                                {/* <div className="col-3">
                                    <p>Weight: {this.props.Item.material_weight} lbs</p>
                                    <p>Type: {this.props.Item.material_type}</p>
                                </div> */}
                                {rightSide}
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
