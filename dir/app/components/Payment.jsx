import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import CheckOut from './CheckOut.jsx';

export default class PaymentPage extends Component {
    render() {
        return( 
        
            <Elements> 
                 <CheckOut />
             </Elements>
        );
    }
}