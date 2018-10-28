import React from 'react';
import IndMess from './indMessage.jsx';
import axios from 'axios'

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            to_user: '',
            listing: {},
            messageList: [],
            newMessText: '',
        }
        this.textHandle = this.textHandle.bind(this);
        this.sendMess = this.sendMess.bind(this);
    }
    textHandle(event) {
        this.setState({
            newMessText: event.target.value,
        });
    }
    sendMess() {
        //send new message, then reload page and fetch the whole list again
        let obj = {
            to_user: this.state.to_user,
            from_user: parseInt(window.localStorage.getItem('userid')),
            for_listing: parseInt(this.props.match.params.id),
            message_content: this.state.newMessText,

        }
        console.log(obj);
        axios.post('http://recyclr.xyz/messages/new', obj ,{headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            console.log(result);
        })
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        //get all messages between two users and order them by time
        let _this = this;
        axios.get(`http://recyclr.xyz/listing/${this.props.match.params.id}`, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            let temp;
            if (_this.state.listing.frozen_by === window.localStorage.getItem('userid')) {
                temp = result.data.user_id;
            }
            else {
                temp = result.data.frozen_by;
            }
            _this.setState({
                to_user: temp,
            });
            let obj = {
                for_listing: parseInt(_this.props.match.params.id),
            }
            axios.post("http://recyclr.xyz/messages/get", obj, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
            .then(function(results) {
                console.log(results);
                if (results.data === null) {

                } else {
                    _this.setState({
                        messageList: results.data,
                    });
                }
            });
            
            });
        
    }
    render() {
        //set row that has all of the message components to have css with 'overflow:scroll'
        return(
            <div className="container-fluid">
                <div className="row">
                    {this.state.messageList.map((item, key) => <IndMess Item={item}></IndMess>)}
                </div>
                <div className='row'>
                    <div className="card">
                        <div className='row'>
                            <div className='col-9'>
                                <textarea className='form-control' value={this.state.newMessText} onChange={this.textHandle}></textarea>
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary' onClick={this.sendMess}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}