import React from 'react';

export default class IndMess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className="card">
                <div className="row">
                    <div className="col -2">
                        <h4>{this.props.Item.message_time}</h4>
                    </div>
                    <div className="col-8">
                        <h2>{this.props.Item.message_content}</h2>
                    </div>
                    <div className="col-2">
                        <h2>{this.props.Item.sender}</h2>
                    </div>
                </div>
            </div>
        );
    }
}