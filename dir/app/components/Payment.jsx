import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import Axios from 'axios';

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
        console.log((window.localStorage.getItem('userid')));

        let _this = this;
        //make get request using stored email/username
        Axios.get('http://recyclr.xyz/user/' + window.localStorage.getItem('userid'),{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            console.log(result.data);
            _this.setState({userObj: result.data});

            console.log("__userObj: " + _this.state.userObj);

            _this.calculateIncentivePercentage();
        }).catch(function(error) {
            console.log(error);
        });

        calculateIncentivePercentage();
    }

    applyIncentive() {
        let newPoints = 301;
        let requestObject = {
            points: newPoints,
        }
        let _this = this;
        Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'),  requestObject, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('token'),}},)
        .then(function(result) {
            console.log(result);
            let newObj = _this.state.userObj;
            newObj.points = newPoints;
            _this.setState({userObj: newObj}, _this.calculateIncentivePercentage());
            
            console.log("__afterChange: " + _this.state.userObj.points);

        }).then(function(error) {
            console.log(error);
        });
    }

    render() {
        return( 
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <div className="card">
                    
                                <h2>Please complete payment with the help of Stripe!</h2>
                                <Elements> 
                                    <CheckOut />
                                </Elements>
                            
                        </div>
                    </div>
                </div>

                <br></br>

                <div className = "row">
                    <div className="col-8 offset-2">
                        <div className="card">
                            <h3>{"Total Incentive Points: " + this.state.userObj.points}</h3>
                            <h4>{"Total Discount Percentage is " + this.state.incentivePercentage + "% by using " + this.state.incentivePoints + " points!"}</h4>
                            <button className="btn btn-primary" onClick={this.applyIncentive}>Apply Incentive</button>
                        </div>
                    </div>
                </div>

             </div>
        );
    }
}