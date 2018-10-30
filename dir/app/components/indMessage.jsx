import React from 'react';
import Axios from 'axios';
import api from './api.js'

export default class IndMess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }
    componentDidMount() {
        let _this = this;
        api.get(`/user/${this.props.Item.from_user}`)
        .then(function(result) {
            _this.setState({
                username: result.data.name,
            })
        });
    }
    render() {
        const date = new Date(this.props.Item.message_time);
        let final;
        if (this.props.Item.to_user === parseInt(window.localStorage.getItem('userid'))) {
            final = <div className="card sameMessage text-left">
                        <div className="row">
                            <div className="col-6">
                                <p>{date.toDateString()}</p>
                                <h5>{this.state.username}</h5>
                            </div>
                            <div className="col-6">
                                <h3>{this.props.Item.message_content}</h3>
                            </div>
                        </div>
                    </div>;
        }
        else {
            final = <div className="card otherMessage text-right">
                        <div className="row">
                            <div className="col-6">
                                <h3>{this.props.Item.message_content}</h3>
                            </div>
                            <div className="col-6">
                                <p>{date.toDateString()}</p>
                                <h5>{this.state.username}</h5>
                            </div>
                            
                        </div>
                    </div>;
        }
        return(
            <div>
                {final}
            </div>
        );
    }
}