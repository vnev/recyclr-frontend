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
    axios.get('http://recyclr.xyz/user/progress/' + window.localStorage.getItem('userid'), { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
      .then(function (result) {
        console.log(result);
        _this.setState({ list: result.data });
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
  render() {
    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Your Recycling Progress</h3>
              <h5 style={{ fontWeight: "normal" }}>Total listings: <b>{this.state.list.length}</b></h5>
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
          </div>
        </div>
      </div>
    )
  }
}
