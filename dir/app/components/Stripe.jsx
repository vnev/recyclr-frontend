import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import Payment from './Payment'

/*Provides stripe API key*/
export default class RealPaymentPage extends Component {
    render() {
        return (

                    <StripeProvider apiKey="pk_test_YefrdUKAmC13gogEqtTIGDt2">
                             <Payment />
                    </StripeProvider>


        );
    }
}
