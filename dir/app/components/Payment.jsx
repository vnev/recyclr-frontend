import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import Axios from 'axios';
import api from './api.js'

import CheckOut from './CheckOut.jsx';

export default class PaymentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: {
                points: 0
            },
            incentivePoints: 0,
            incentivePercentage: 0,
            incentiveUsed: false,
        }
        this.applyIncentive = this.applyIncentive.bind(this);
        this.calculateIncentivePercentage = this.calculateIncentivePercentage.bind(this);
    }

    calculateIncentivePercentage() {
        let points = Math.floor(this.state.userObj.points / 100) * 100;
        this.setState({incentivePoints: points});
        if( points > 5000 ) {
            this.setState({incentivePercentage: 50});
        }
        else {
            this.setState({incentivePercentage: (points / 100)});
        }
    }

    componentDidMount() {

        api.post('/listing/')

        let _this = this;
        //make get request using stored email/username
        Axios.get('http://recyclr.xyz/user/' + window.localStorage.getItem('userid'),{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {

            _this.setState({userObj: result.data});
            _this.calculateIncentivePercentage();
        }).catch(function(error) {

        });
    }

    applyIncentive() {
        let newPoints = this.state.userObj.points - this.state.incentivePoints;
        let requestObject = {
            points: newPoints,
        }
        let _this = this;
        Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'),  requestObject, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('token'),}},)
        .then(function(result) {
            console.log(window.localStorage.getItem('currID'));
            api.post(`/user/deduct/${window.localStorage.getItem('currID')}`, {percentage: _this.state.incentivePercentage})
            .then(function(result) {
                console.log(result);
            })
            let newObj = _this.state.userObj;
            newObj.points = newPoints;
            _this.setState({userObj: newObj}, _this.calculateIncentivePercentage());
            _this.setState({incentiveUsed: true});
        }).then(function(error) {

        });
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                                <h2>Please complete payment with the help of Stripe!</h2>
                                {this.state.incentiveUsed &&
                                    <h5 className="alert-success text-center">
                                        {this.state.incentivePercentage}% discount has been applied!
                                    </h5>
                                }
                                <Elements>
                                    <CheckOut />
                                </Elements>
                        </div>
                    </div>
                </div>

                <br></br>

                <div className = "row">
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

             </div>
        );
    }
}
