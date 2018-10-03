import React, { Component } from 'react';
import {CardElement} from 'react-stripe-elements';

export default class CardSection extends Component {
    render() {
        return(
            <div className="row align-content-left">
               <div className="col-3">
                    <h3>Card Details</h3>
                    <CardElement style={{base: {fontSize: '18px'}}}/>
                </div>
            </div>
        );
    }
}