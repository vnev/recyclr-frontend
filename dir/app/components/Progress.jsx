import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon}from 'react-share'
//TODO: REPLACE DUMMY VALUES WITH DATABASE VALUES
export default class Progress extends Component {

    render() {
      return(
        <div>
          <h1>My Recyclr Progress</h1>
          <h3>Total volume of recycling: 10 lbs</h3>
          <h3>Total number of pickups: 5</h3>
          <FacebookShareButton
          url='http://recyclr.xyz'
          quote="My Recyclr Progress: Total Number of recycling: 10, Total Number of pcikups: 5">
          <FacebookIcon
            size={32}
            round
          />
          </FacebookShareButton>
        </div>
      )
    }
}
