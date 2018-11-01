import React from 'react';
import { formatPrice } from '../utils/config';

export default class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let d = new Date(this.props.Item.created_at)
        let v = this.props.Item.price;
        v = Math.round(v * 100) / 100
        return (
            <div className="card listingRow">
                <div className="card-body">
                    <h5>Price: <b>{formatPrice(v)}</b></h5>
                    <h5>Transaction Date: <b>{d.toDateString()}</b></h5>
                    <h5>Company : <b>{this.props.Item.company_name}</b></h5>
                </div>

            </div>
        );
    }
}