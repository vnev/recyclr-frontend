import React from 'react';
import {Route} from 'react-router-dom';
import history from './history.js';

export default class ListingItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return(
            <div className="card listingRow">
                <div className="row ">
                    <div className="col-3">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/51ZLGkYM7PL.jpg" height="100" width="100"/>
                    </div>
                    <div className="col-3">
                        <h2>{this.props.Item.title}</h2>
                        <h3>{this.props.Item.description}</h3>
                    </div>
                    <div className="col-3">
                        <h2>{this.props.Item.materail_Weight}</h2>
                        <h3>{this.props.Item.material_type}</h3>
                    </div>
                    <div className="col-3 text-right">
                        <p>{this.props.Item.userId}</p>
                        <button className="btn btn-primary">Freeze listing</button>
                        
                          <button className="btn btn-secondary" onClick={() => { history.push('/choose_date/' + this.props.Item.listing_id) }}>Select Pickup date</button>
                          <button className="btn btn-secondary" onClick={() => { history.push('/choose_date') }}>Select Pickup date</button>
                          <button className="btn btn-primary" onClick={()=> {history.push('/Payment.jsx')} }>Payment</button>
                    </div>
                </div>
            </div>

        );
    }
}
