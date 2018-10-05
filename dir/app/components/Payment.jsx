import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import CheckOut from './CheckOut.jsx';

export default class PaymentPage extends Component {
    render() {
        return( 
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                    
                                <h2>Please complete payment with the help of Stripe!</h2>
                                <Elements> 
                                    <CheckOut />
                                </Elements>
                            
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}