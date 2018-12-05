import React from 'react';
import { formatPrice } from '../utils/config';

/*Invoices are provided after a company and a user complete a transaction. This is the component for a single invoice item*/
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
                    <h5>Transaction date: <b>{d.toDateString()}</b></h5>
                    <h5>Company: <b>{this.props.Item.company_name}</b></h5>
                    <h5>Listing Title: <b>{this.props.Item.title}</b></h5>
                </div>

            </div>
        );
    }
}
