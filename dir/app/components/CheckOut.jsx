import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection.jsx';
import Axios from 'axios';
import toastr from 'toastr';
import history from './history.js';
import api from './api.js'

class CheckOutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
        this.submitHandle = this.submitHandle.bind(this);
    }

    /*This component is the checkout page for paying to post a listing on recyclr, providing form fields for a credit card.
    Credit card data is processed using Stripe API*/
    submitHandle(ev) {
        ev.preventDefault();
        var bodyFormData = new FormData();
        this.props.stripe.createToken({ name: localStorage.getItem('username') }).then(token => {
            // console.log(token);
            // console.log(token.id);
            // console.log(token.token);
            bodyFormData.set('token', token.token.id);
            bodyFormData.set('listing_id', window.localStorage.getItem('currID'));
            api.post(`/charge`, bodyFormData)
                .then(function (response) {
                    //handle success
                    console.log(response);
                    toastr.options.closeButton = true;
                    toastr.success("Transaction successful", "Success!");
                    history.push("/progress");
                })
                .catch(function (error) {
                    //handle error
                    console.log(error);
                    toastr.options.closeButton = true;
                    toastr.error("Could not complete transaction. Please try again", "Error");
                });
        });
    }

    render() {
        return (

            <form onSubmit={this.submitHandle}>
                <CardSection />
                <div className="row align-content-left">
                    <div className="col-12 text-center">
                        <button className="btn btn-primary paymentBtn" id="paymentBtn">Confirm</button>
                    </div>
                </div>
            </form>

        );
    }
}
export default injectStripe(CheckOutPage);
