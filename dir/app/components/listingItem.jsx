import React from 'react';
import ReactDOM from 'react-dom'
import history from './history.js';
import Axios from 'axios';
import api from './api.js';

export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            name: ''
        }
        this.createInvoice = this.createInvoice.bind(this);
        this.freezeListing = this.freezeListing.bind(this);
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
        Axios.post(`http://recyclr.xyz/listing/freeze/${this.props.Item.listing_id}`, obj, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                console.log(result);
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
        let rightSide;
        let button;
        if (window.localStorage.getItem('is_company') === 'true') {
            button = <button className="btn btn-primary" onClick={this.createInvoice}>Transaction Complete</button>
        }
        if (this.props.ButBool === true) {
            rightSide = <div className="col-3 text-right">
                <p style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>By: <b>{this.props.Item.username}</b></p>
                <button style={{ display: "block", width: "100%" }} className="btn btn-primary margin-bottom-2" onClick={this.freezeListing}>Freeze</button>
                <button style={{ display: "block", width: "100%" }} className="btn btn-dark" onClick={() => { history.push('/payment') }}>Payment</button>
            </div>;
        }
        else {
            rightSide = <div><button className="btn btn-primary" onClick={() => history.push(`/chatroom/${this.props.Item.listing_id}`)}>Enter Chat</button>
                <p style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>Frozen By: <b>{this.props.Item.company_name}</b></p></div>
        }
        return (
            <div className="row" style={{ marginBottom: "5px" }}>
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
                                    <p><b>Distance</b>: {this.props.Item.distance} miles</p>
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
