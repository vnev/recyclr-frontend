import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon}from 'react-share'
import history from './history.js'
import axios from 'axios'
//TODO: REPLACE DUMMY VALUES WITH DATABASE VALUES
export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
   componentDidMount() {
    console.log((window.localStorage.getItem('userid')));
    //  console.log(user_id);
      let _this = this;
      //make get request using stored email/username
      axios.get(`http://recyclr.xyz/user/progress/${parseInt(window.localStorage.getItem('userid'))}`,{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
      .then(function(result) {
          console.log(result.data);
          _this.setState({list: result.data});
      })
      //set list = returned json objects list = results.data
  }
    render() {
      return(
        <div>
          <h1>My Recyclr Progress</h1>
          <h3>Total number of Recyclr listings: {this.state.list.size}</h3>
          <FacebookShareButton
          url='http://recyclr.xyz'
          quote="My Recyclr Progress: Total Number of recycling: 10, Total Number of pcikups: 5">
          <FacebookIcon
            size={32}
            square
          />
          </FacebookShareButton>
        </div>
      )
    }
}
