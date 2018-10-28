import React from 'react';
import ReactDOM from 'react-dom'
import history from './history.js';
import Axios from 'axios';

export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            name: ''
        }

        this.freezeListing = this.freezeListing.bind(this);
    }
    componentDidMount() {
        // TODO: actually add a "created by" name based on per listing, and not just a singular user's name
        let _this = this;
        let userId = this.props.Item.user_id;
        Axios.get(`http://recyclr.xyz/user/${userId}`, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                _this.setState({
                    name: result.data.name
                });
            });
    }
    freezeListing() {

    }
    render() {
        let rightSide;
        if (this.props.ButBool === true) {
            rightSide = <div className="col-3 text-right">
                <p style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>By: <b>{this.state.name}</b></p>
                <button className="btn btn-primary margin-bottom-2" onClick={this.freezeListing}>Freeze</button>
                <button className="btn btn-secondary margin-bottom-2" onClick={() => { history.push('/choose_date/' + this.props.Item.listing_id) }}>Select Pickup date</button>
                <button className="btn btn-primary" onClick={() => { history.push('/payment') }}>Payment</button>
            </div>;
        }
        else {
            rightSide = <button className="btn btn-primary" onClick={() => history.push(`/chatroom/${this.props.Item.listing_id}`)}>Enter Chat</button>
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
                                    <p><b>Weight</b>: {this.props.Item.material_weight} lbs, Type: {this.props.Item.material_type}</p>
                                </div>
                                {/* <div className="col-3">
                                    <p>Weight: {this.props.Item.material_weight} lbs</p>
                                    <p>Type: {this.props.Item.material_type}</p>
                                </div> */}
                                {rightSide}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
