import React from 'react';
import IndMess from './indMessage.jsx';
import axios from 'axios';
import history from './history.js';
import api from './api.js';


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
        let _this = this;
        //send new message, then reload page and fetch the whole list again
        let obj = {
            to_user: this.state.to_user,
            from_user: parseInt(window.localStorage.getItem('userid')),
            for_listing: parseInt(this.props.match.params.id),
            message_content: this.state.newMessText,

        }
        console.log(obj);
        api.post('/messages/new', obj)
            .then(function (result) {
                window.history.go(0);
            });
    }
    componentDidMount() {
        if (window.localStorage.getItem('userid') === null) {
            history.push('/auth');
        }
        //get all messages between two users and order them by time
        let _this = this;
        api.get(`/listing/${this.props.match.params.id}`)
            .then(function (result) {
                let temp;
                if (result.data.frozen_by === parseInt(window.localStorage.getItem('userid'))) {
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
                api.post("/messages/get", obj)
                    .then(function (results) {
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
        let elem;
        if (this.state.messageList.length === 0) {
            elem = <h4 className="text-center">No messages yet!</h4>
        } else {
            elem = this.state.messageList.map((item, key) => <IndMess key={key} Item={item} other_user={this.state.to_user}></IndMess>)
        }
        return (
            <div className="container">
                <div className="card" style={{ border: "0px", padding: "5px", overflowY: "scroll", height: "70vh", maxHeight: "80vh" }}>
                    <div className="card-body">
                        {elem}
                    </div>
                </div>

                <div className='row' style={{ marginTop: "30px" }}>
                    <div className='card' style={{ width: "100%", border: "0px", background: "inherit" }}>
                        <div className='row'>
                            <div className='col-10' style={{ padding: "0px" }}>
                                <input type="text" className='form-control' value={this.state.newMessText} onChange={this.textHandle} />
                            </div>
                            <div className='col-2' style={{ textAlign: "center", padding: "0px" }}>
                                <button style={{ width: "100%" }} className='btn btn-primary' onClick={this.sendMess}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}