import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection.jsx';

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
        this.props.stripe.createToken({name : localStorage.getItem('bob')}).then(({token}) => {
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
            <form>
                <h2>Enter in your desired pick up location</h2>
                <input type="text" className="form-control addressInput" 
                     placeholder="6969 Sharmp way, Shrimp, IN" value={this.state.address} onChange={this.addressHandle}>
                </input>
                <CardSection />
                <div className="row align-content-left">
                    <div className="col-3">
                         <button className="btn btn-primary paymentBtn" onClick={this.submitHandle}>Confirm</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default injectStripe(CheckOutPage);