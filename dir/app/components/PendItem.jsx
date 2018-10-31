import React from 'react';
import history from './history.js';

export default class PendTranItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="card listingRow">
                <div className="row">
                    <div className="col-7">
                        <h2>Price : {this.props.Item.price}</h2>
                        <h2>Transaction date : {this.props.Item.transDate}</h2>
                        <h2>Company : {this.props.Item.company}</h2>
                    </div>
                    <button className="btn btn-primary paymentBtn" onClick={()=> {history.push('/payment')} }>Complete Payment</button>
                </div>
            </div>
        );
    }
}