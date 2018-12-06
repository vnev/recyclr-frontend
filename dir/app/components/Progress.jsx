import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share'
import ListingItem from './listingItem'
import history from './history.js'
import axios from 'axios'
import toastr from 'toastr'

/*Progress acts as a profile page, providing total stats for a user account, like how much weight of material they have listed, and their total incentive points earned*/
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
    axios.get('http://recyclr.xyz/api/user/progress/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
      .then(function (result) {
        console.log(result.data);
        if (result.data === null) {
          _this.setState({ list: [] });
        }
        else {
          _this.setState({ list: result.data });
          // _this.calculateWeight();
        }

        axios.get('http://recyclr.xyz/api/user/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
          .then(function (result) {

            _this.setState({ userObj: result.data });
            _this.calculateNextIncentiveLevel();
            _this.calculateWeight();
          }).catch(function (error) {
            console.log(error);
          });
      }).catch(function (error) {
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
  calculateWeight() {

    var i;
    let temp = 0;
    for (i = 0; i < this.state.list.length; i++) {
      temp += this.state.list[i].material_weight;
    }

    this.setState({
      totalWeight: temp
    });
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
            <div className="text-center">
              <p>Total number of Recyclr listings created: <b>{this.state.list.length}</b></p>
              <p>Total weight of Recyclr listings: <b>{this.state.totalWeight} lbs</b></p>
              <p>Total amount of Incentive Points: <b>{this.state.userObj.points}</b></p>
              <p>Total points to next incentive level: <b>{this.state.nextToIncentive}</b></p>
            </div>
            <div id="socialWrapper" onClick={this.hasShared}>
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <FacebookShareButton
                  url='http://recyclr.xyz'
                  quote="My Recyclr Progress: Total Number of recycling:  {_this.state.list.length}"
                  id="socialButton"
                  className="text-center"
                >
                  <FacebookIcon
                    size={32}
                    square
                  />
                </FacebookShareButton>
              </div>

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
