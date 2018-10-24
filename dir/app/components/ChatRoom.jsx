import React from 'react';
import IndMess from './indMessage.jsx';

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            newMessText: '',
        }
        this.textHandle = this.textHandle.bind(this);
    }
    textHandle(event) {
        this.setState({
            newMessText: event.target.value,
        });
    }
    sendMess() {
        //send new message, then reload page and fetch the whole list again
    }
    componentDidMount() {
        //get all messages between two users and order them by time
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