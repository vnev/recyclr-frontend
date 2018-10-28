import React from 'react';
import ReactDOM from 'react-dom'
import history from './history.js';
import Axios from 'axios';

export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
        }
    }
    componentDidMount() {
       
    }
    render() {
        let rightSide;
        if (this.props.ButBool === true) {
            rightSide = <div className="col-3 text-right">
                <p>{this.props.Item.userId}</p>
                <button className="btn btn-primary">Freeze</button>
                <button className="btn btn-secondary" onClick={() => { history.push('/choose_date/' + this.props.Item.listing_id) }}>Select Pickup date</button>
                <button className="btn btn-primary" onClick={()=> {history.push('/payment')} }>Payment</button>
            </div>;
        }
        else {
            rightSide = <button className="btn btn-primary" onClick={()=> history.push(`/chatroom/${this.props.Item.listing_id}`)}>Enter Chat</button>
        }
        return(
            <div className="card listingRow">
                <div className="row ">
                    <div className="col-3">
                        <img src={this.props.Item.img_hash} height="100" width="100"/>
                    </div>
                    <div className="col-3">
                        <h2>{this.props.Item.title}</h2>
                        <h3>{this.props.Item.description}</h3>
                        <h3>Distance: {this.props.Item.distance} miles</h3>
                    </div>
                    <div className="col-3">
                        <h2>Weight: {this.props.Item.material_weight} lbs</h2>
                        <h3>Type: {this.props.Item.material_type}</h3>           
                    </div>
                    {rightSide}
                </div>
            </div>

        );
    }
}
