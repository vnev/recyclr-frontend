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
        Axios.get('http://recyclr.xyz/user/' + this.state.userToBan + '/ban').then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
        window.localStorage.removeItem('userid');
        window.localStorage.removeItem('useremail');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="title">Admin Tools</h3>
                            <p>Enter the email of the user to be banned</p>
                            <div className="row">
                                <div className="col-md-4 offset-md-4">
                                    <form>
                                        <input type="text" className="form-control" placeholder="bob@recyclr.xyz" value={this.state.userToBan} onChange={this.handleChange}></input>
                                        <button id="banBtn" className="btn btn-primary formButton" onClick={this.banUser}>Ban User</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}