import React from 'react'
import ListingItem from './listingItem.jsx'
import axios from 'axios'

export default class ChatSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
        }
        
    }
    componentDidMount() {
        //get all listings that a user has frozen
        let _this = this;
        axios.get(`http://recyclr.xyz/listing/frozen/${window.localStorage.getItem('userid')}`, {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 
                'Access-Control-Allow-Origin': '*'
            }})
        .then(function(result){
            console.log(result);
             _this.setState({
                chatList: result.data,
        })});
    }
    render() {
        console.log(this.state.chatList);
        return(
            <div className="container-fluid">
                {this.state.chatList.map((item, key) => {
                   return <ListingItem Item={item} ButBool={false}/>
                })}
            </div>
                
        );
    }
}