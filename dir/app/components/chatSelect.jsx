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
        let obj = {
            is_company: window.localStorage.getItem('is_company') == false ? false : true,
        }
        let _this = this;
        axios.post(`http://recyclr.xyz/listing/frozen/${window.localStorage.getItem('userid')}`, obj, {
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 
                'Access-Control-Allow-Origin': '*'
            }})
        .then(function(result){
            console.log(result);
             _this.setState({
                chatList: result.data,
            })
        });
    }
    render() {
        let disp =  <h2>You have no messages</h2>
                    
        if (this.state.chatList !== null) {
            disp =  this.state.chatList.map((item, key) => {
                        return <ListingItem key={key} Item={item} ButBool={false}/>
                        })
                   
        }
        return(
            <div className="container-fluid">
                {disp}
            </div>
        );
    }
}