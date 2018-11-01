import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share'
import ListingItem from './listingItem'
import history from './history.js'
import axios from 'axios'
//TODO: REPLACE DUMMY VALUES WITH DATABASE VALUES
export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {
        points: 0
      },
      list: [],
      shared: false,
      incentiveCheck: '',
      totalWeight: 0,
      nextToIncentive: 0
    }
    this.hasShared = this.hasShared.bind(this);
  }
  componentDidMount() {
    if (window.localStorage.getItem('username') === null) {
      history.push('/auth');
    }
    //console.log((window.localStorage.getItem('userid')));
    //  console.log(user_id);
    let _this = this;
    //make get request using stored email/username
    axios.get('http://recyclr.xyz/user/progress/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
      .then(function (result) {
        console.log(result.data);
        if (result.data === null) {
          _this.setState({ list: [] });
        }
        else {
          _this.setState({ list: result.data });
        }
      }).catch(function (error) {
        console.log(error);
      })

    axios.get('http://recyclr.xyz/user/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
      .then(function (result) {

        _this.setState({ userObj: result.data });
        _this.calculateNextIncentiveLevel();
      }).catch(function (error) {
        console.log(error);
      });
    //set list = returned json objects list = results.data
  }
  hasShared() {
    let _this = this
    _this.setState({
      shared: true,
    });
    console.log(this.state.shared);
  }
  calculateWeight() {

    var i;
    for (i = 0; i < this.state.list.length; i++) {

      this.state.totalWeight += this.state.list[i].material_weight;
    }
  }

  calculateNextIncentiveLevel() {
    let points = this.state.userObj.points % 100;
    this.setState({ nextToIncentive: 100 - points });
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center">My Recyclr Progress</h1>
            <p>Total number of Recyclr listings created: <b>{this.state.list.length}</b></p>
            <p>Total weight of Recyclr listings: <b>{this.calculateWeight(), this.state.totalWeight} lbs</b></p>
            <p>Total amount of Incentive Points: <b>{this.state.userObj.points}</b></p>
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

              <div className="row">
                {this.state.list.map((item, key) => {
                  return <ListingItem key={key} Item={item} ButBool={false} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
