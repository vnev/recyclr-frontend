import React from 'react';
import Axios from 'axios';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userToBan: "",
        };

        this.banUser = this.banUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev) {
        this.setState({
            userToBan: ev.target.value,
        });
    }

    banUser(event) {
        console.log(this.state.userToBan)
        Axios.get('http://recyclr.xyz/user/' + this.state.userToBan + '/delete').then(function(result) {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        });
        window.localStorage.removeItem('userid');
        window.localStorage.removeItem('useremail');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
    }

    render() {
        return(
            <div className="row align-content-left ">
                <div className="col">
                    <h3 className="title">Admin Tools </h3>
                    <h6 className="banUser">Ban a user</h6>

                    <form>
                        <input type="text" className="form-control banInput" placeholder="example: bob@recyclr.xyz" value={this.state.userToBan} onChange={this.handleChange}></input>
                        <button className="btn btn-primary banButton" onClick={this.banUser}>Ban User</button>
                    </form>
                    
                </div>
            </div>
        );
    }

}