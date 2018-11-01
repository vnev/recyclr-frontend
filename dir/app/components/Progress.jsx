import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share'
import history from './history.js'
import axios from 'axios'
//TODO: REPLACE DUMMY VALUES WITH DATABASE VALUES
export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      shared: false,
      incentiveCheck: '',
      totalWeight: 0
    }
    this.hasShared = this.hasShared.bind(this);
  }
  componentDidMount() {
    if (window.localStorage.getItem('username') === null) {
      history.push('/auth');
    }
    console.log((window.localStorage.getItem('userid')));
    //  console.log(user_id);
      let _this = this;
      //make get request using stored email/username
      axios.get('http://recyclr.xyz/user/progress/' + window.localStorage.getItem('userid'),{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
      .then(function(result) {
          console.log(result.data);
          if (result.data === null) {
            _this.setState({list: []});
          }
          else {
            _this.setState({list: result.data});
          }
      }).catch(function(error) {
        console.log(error);
      })
    //set list = returned json objects list = results.data
  }
  hasShared() {
    let _this = this
    _this.setState({
      shared: true,
    });
    console.log(this.state.shared);
  }

  calculateIncentive() {

    if(this.state.list.length < 5) {
      this.state.incentiveCheck = 5;
    }

    else if(this.state.list.length < 10) {
      this.state.incentiveCheck = 10;
    }

    else if(this.state.list.length < 50) {
      this.state.incentiveCheck = 50;
    }

    else if(this.state.list.length < 100) {
      this.state.incentiveCheck = 100;
    }

    else if(this.state.list.length < 500) {
      this.state.incentiveCheck = 500;
    }
  }

  calculateWeight() {

    var i;
    for(i = 0; i < this.state.list.length; i++) {

      this.state.totalWeight += this.state.list[i].material_weight;
    }
  }
    render() {
      return(
        <div>
          <h1>My Recyclr Progress</h1>
          <h3>Total number of Recyclr listings created: {this.state.list.length}</h3>
          <h3>Total weight of Recyclr listings: {this.calculateWeight(), this.state.totalWeight} lbs</h3>

          <h3>Next Recyclr listings goal: {this.calculateIncentive(), this.state.incentiveCheck}. You need {this.state.incentiveCheck - this.state.list.length} more listings sold to reach your goal.</h3>
          <div id="socialWrapper" onClick={this.hasShared}>
          <FacebookShareButton
            url='http://recyclr.xyz'
            quote="My Recyclr Progress: Total Number of recycling:  {_this.state.list.length}"
            id="socialButton"
          >
          <FacebookIcon
            size={32}
            square
          />
          </FacebookShareButton>
        </div>
      </div>
    )
  }
}
