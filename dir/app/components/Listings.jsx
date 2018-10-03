import React from 'react'
import listItem from './listingItem.jsx'
import axios from 'axios'

export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        //make get request using stored email/username
        axios.get("https://localhost:8080/listings")
        .then(function(result) {
            this.state.list = result.data;
            console.log(result.data);
        })
        //set list = returned json objects list = results.data
    }
    render() {
        return(
            <div className="container">
                <div className="card">
                    {this.state.list.map((item,index) => {
                        <listItem></listItem>
                    })}
                </div>
            </div>
        );
    }


}