import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import Payment from './Payment'

export default class RealPaymentPage extends Component {
    render() {
        return (
           
                    <StripeProvider apiKey="pk_test_12345">
                             <Payment />
                    </StripeProvider>
            
        );
    }
}