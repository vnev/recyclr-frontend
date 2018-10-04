import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection.jsx';
import Axios from 'axios';

 class CheckOutPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            address: ""
        }
        this.submitHandle = this.submitHandle.bind(this);
        this.addressHandle = this.addressHandle.bind(this);
      }

    submitHandle(ev) {
        ev.preventDefault();
        Axios.post(`http://recyclr.xyz/charge`, )
        this.props.stripe.createToken({name : window.localStorage.setItem('user', user)}).then(({token}) => {
            console.log('__Received Stripe token: ', token);
            console.log('Address', this.state.address);
        });
    }

    addressHandle(ev) {
        this.setState({
            address: ev.target.value,
        });
    }

    render() {
        return(
            <form onSubmit={this.submitHandle}>
                <h2>Enter in your desired pick up location</h2>
                <input type="text" className="form-control addressInput" 
                     placeholder="6969 Sharmp way, Shrimp, IN" value={this.state.address} onChange={this.addressHandle}>
                </input>
                <CardSection />
                <div className="row align-content-left">
                    <div className="col-3">
                         <button className="btn btn-primary paymentBtn">Confirm</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default injectStripe(CheckOutPage);