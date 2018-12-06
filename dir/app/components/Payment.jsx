import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import Axios from 'axios';
import api from './api.js'
import { formatPrice } from '../utils/config'

import CheckOut from './CheckOut.jsx';

/*Payment is used to calculate the total price of creating the listing. It allows the user to spend their incentive points to reduce the cost of listing their item*/
export default class PaymentPage extends Component {
    /*  userObj -> points: holds points that user has
        incentivePoints: amount of points that incentive costs
        incentivePercentage: percentage discount that current incentive points give
        incentiveUsed: boolean for if 'Apply Incentive' has been clicked
        price: price of listing from localStorage
        incentivePercentageApplied: percentage that was applied to price of listing
    */
    constructor(props) {
        super(props);
        this.state = {
            userObj: {
                points: 0
            },
            incentivePoints: 0,
            incentivePercentage: 0,
            incentiveUsed: false,
            price: 0,
            incentivePercentageApplied: 0
        }
        this.applyIncentive = this.applyIncentive.bind(this);
        this.calculateIncentivePercentage = this.calculateIncentivePercentage.bind(this);
    }

    calculateIncentivePercentage() {
        let points = Math.floor(this.state.userObj.points / 100) * 100;
        this.setState({ incentivePoints: points });
        if (points > 5000) {
            this.setState({ incentivePercentage: 50 });
        }
        else {
            this.setState({ incentivePercentage: (points / 100) });
        }
    }

    componentDidMount() {
        this.setState({ price: window.localStorage.getItem('price') });

        let _this = this;
        Axios.get('http://recyclr.xyz/user/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                _this.setState({ userObj: result.data });
                _this.calculateIncentivePercentage();
            }).catch(function (error) {
                console.log(error);
            });
    }

    applyIncentive() {
        let newPoints = this.state.userObj.points - this.state.incentivePoints;
        let requestObject = {
            points: newPoints,
        }
        let _this = this;
        Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'), requestObject, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), } })
            .then(function (result) {
                console.log(window.localStorage.getItem('currID'));
                api.post(`/user/deduct/${window.localStorage.getItem('currID')}`, { percentage: _this.state.incentivePercentage })
                    .then(function (result) {
                        console.log(result);
                    })
                let newObj = _this.state.userObj;
                newObj.points = newPoints;
                _this.setState({ userObj: newObj });
                _this.setState({ incentiveUsed: true });
                _this.setState({ incentivePercentageApplied: _this.state.incentivePercentage });
                let newPrice = (_this.state.price * ((100 - _this.state.incentivePercentage) / 100)).toFixed(2);
                console.log("__newPrice: " + newPrice + " percentage: " + _this.state.incentivePercentage);
                _this.setState({ price: newPrice });
                _this.calculateIncentivePercentage();
                toastr.options.closeButton = true;
                toastr.success("Successfully applied incentives", "Success");
            }).then(function (error) {
                console.log(error);
                toastr.options.closeButton = true;
                toastr.error("Failed to apply incentives", "Error");
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card text-center">
                            <h2 className="text-dark">{"Total Incentive Points: " + this.state.userObj.points}</h2>
                            <h5 className="text-info">{"Total Discount Percentage is " + this.state.incentivePercentage + "% by using " + this.state.incentivePoints + " points!"}</h5>
                            {!this.state.incentiveUsed &&
                                <button className="btn btn-info" onClick={this.applyIncentive}>Apply Incentive</button>
                            }
                            {this.state.incentiveUsed &&
                                <button className="btn btn-info" onClick={this.applyIncentive} disabled>Apply Incentive</button>
                            }
                        </div>
                    </div>
                </div>

                <br></br>

                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-center">Please complete payment with the help of Stripe!</h4>
                                <h5 className="text-center">Total: <b>{formatPrice(this.state.price)}</b></h5>
                                {this.state.incentiveUsed &&
                                    <h5 className="alert-success text-center">
                                        {this.state.incentivePercentageApplied}% discount has been applied!
                                        </h5>
                                }
                                <Elements>
                                    <CheckOut />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
