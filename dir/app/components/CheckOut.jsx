import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection.jsx';
import Axios from 'axios';
import api from './api.js'

 class CheckOutPage extends Component{

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
        this.props.stripe.createToken({name : localStorage.getItem('username')}).then(token =>{
            console.log(token);
            console.log(token.id);
            console.log(token.token);
            bodyFormData.set('token', token.token.id);
            bodyFormData.set('listing_id', window.localStorage.getItem('currID'));
            Axios.post(`http://recyclr.xyz/charge`,  bodyFormData ,{headers : {'Content-Type' : 'multipart/form-data'}}).then(function(result) {
                console.log("Purchase Complete");
            }).then(function (response) {
                //handle success
                console.log(response);
                    let obj = {
                        listing_id : window.localStorage.getItem('currID'),
                    }
                    console.log(window.localStorage.getItem('currID'));
                    Axios.post(`http://recyclr.xyz/invoice/create`, obj, {headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' }})
                    .then(function(result) {
                        console.log(result);
                    }).catch(function(error) {
                        console.log(error);
                    })
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        });
    }

    render() {
        return(
            
            <form onSubmit={this.submitHandle}>
                <CardSection />
                <div className="row align-content-left">
                    <div className="col-12">
                         <button className="btn btn-primary paymentBtn">Confirm</button>
                    </div>
                </div>
            </form>
            
        );
    }
}
export default injectStripe(CheckOutPage);