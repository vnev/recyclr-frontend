import React from 'react'

export default class ChatSelelct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
        }
        
    }
    componentDidMount() {
        //send all of the distinct from_user ids
    }
    render() {
        return(
            <div className="container-fluid">
                {this.state.chatList.map((item, key) => {
                    return(
                        <div className="row">
                            <div className="col-8 offset-2">
                                <h1><a href="/something">{item.name}</a></h1>
                            </div>
                        </div>
                    );
                })}
            </div>
                
        );
    }
}