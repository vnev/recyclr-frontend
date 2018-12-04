import React from 'react';
import { formatPrice } from '../utils/config';
import Axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

export default class InvoiceItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: props.Item.transaction_rating
        };

        this.onStarClick = this.onStarClick.bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        // Call back function for set state
        this.setState({
            rating: nextValue,
        }, () => {
            console.log("rating is: " + this.state.rating);

            let requestObject = {
                transaction_rating: this.state.rating,
                invoice_id: this.props.Item.invoice_id
            }
            
            Axios.put(`http://recyclr.xyz/invoice/rating`, requestObject, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), } })
            .then(function (result) {
                console.log(result);
            })

            let requestRating = {
                listing_id: this.props.Item.listing_id,
                rating: this.state.rating
            }

            Axios.put(`http://recyclr.xyz/user/rating`, requestRating, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), } })
            .then(function (result) {
                console.log(result);
            }).then(function (error) {
                console.log(error);
            })

        })

        let requestObject = {
            rating: this.state.rating,
        }

        // need request url ex
        let _this = this;
        /*Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'), requestObject, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), } })
        .then(function (result) {
            console.log(result);
            window.localStorage.setItem('username', _this.state.newUsername);
            _this.setState({newUsername: ''});
        }).then(function (error) {
            console.log(error);
        })*/
    }

    render() {
        const { rating } = this.state;
        console.log(this.props.Item);
        let d = new Date(this.props.Item.created_at)
        let v = this.props.Item.price;
        v = Math.round(v * 100) / 100
        return (
            <div className="card listingRow">
                <div className="card-body">
                    <h5>Price: <b>{formatPrice(v)}</b></h5>
                    <h5>Transaction date: <b>{d.toDateString()}</b></h5>
                    <h5>Company: <b>{this.props.Item.company_name}</b></h5>
                    <h5>Listing Title: <b>{this.props.Item.title}</b></h5>
                    <h4>Rate Your Transaction: {rating}/5</h4>
                    <StarRatingComponent 
                        name="rate1" 
                        starCount={5}
                        value={rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
 
                </div>

            </div>
        );
    }
}