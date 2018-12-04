import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection.jsx';
import Axios from 'axios';
import api from './api.js'

class CheckOutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
        this.submitHandle = this.submitHandle.bind(this);
    }

    submitHandle(ev) {
        ev.preventDefault();
        var bodyFormData = new FormData();
        this.props.stripe.createToken({ name: localStorage.getItem('username') }).then(token => {
            console.log(token);
            console.log(token.id);
            console.log(token.token);
            bodyFormData.set('token', token.token.id);
            bodyFormData.set('listing_id', window.localStorage.getItem('currID'));
            Axios.post(`http://recyclr.xyz/charge`, bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(function (result) {
                console.log("Purchase Complete");
            }).then(function (response) {
                //handle success
                console.log(response);
            })
                .catch(function (response) {
                    //handle error
                    console.log(response);
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