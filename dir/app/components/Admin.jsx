import React from 'react';
import Axios from 'axios';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToBan: "",
        };

        this.banUser = this.banUser.bind(this);
    }

    banUser() {
        this.setState({
            userToBan: event.target.value,
        })
    }

    render() {
        return(
            <div className="row align-content-left ">
                <div className="col">
                    <h3 className="title">Admin Tools </h3>
                    <h6 className="banUser">Ban a user</h6>

                    <form>
                        <input type="text" className="form-control banInput" placeholder="example: bob@recyclr.xyz" value={this.state.userToBan} onChange={this.banUser}></input>
                        <button className="btn btn-primary banButton" onClick={this.banUser}>Ban User</button>
                    </form>
                    
                </div>
            </div>
        );
    }

}