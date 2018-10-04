import React from 'react'
import ListingItem from './listingItem'
import history from './history.js'
import axios from 'axios'

export default class Listings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        if (window.localStorage.getItem('user') === null) {
            history.push('/auth');
        }
        let _this = this;
        //make get request using stored email/username
        axios.get("http://recyclr.xyz/listings",{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            console.log(result.data);
            _this.setState({list: result.data});
        })
        //set list = returned json objects list = results.data
    }
    render() {
        return(
            <div className="container">
                <div className="card">
                    {this.state.list.map((item,key) => {
                        return <ListingItem Item={item}/>
                    })}
                </div>
            </div>
        );
    }


}