import React from 'react';

export default class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let d = new Date(this.props.Item.created_at)
        let v = this.props.Item.price;
        v = Math.round(v*100)/100
        return(
            <div className="card listingRow">
                <div className="row">
                    <div className="col">
                        <h2>Price : $ {v}</h2>
                        <h2>Transaction date : {d.toDateString()}</h2>
                        <h2>Company : {this.props.Item.company_name}</h2>
                        <h2>Listing Title : {this.props.Item.title}</h2>
                    </div>
                </div>

            </div>
        );
    }
}