import React, { Component } from 'react';
// import Axios from 'axios';
// import urls  from './Urls.js';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: "",
            newEmail: ""
        };
        this.usernameHandle = this.usernameHandle.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    usernameHandle(event) {
        this.setState({
            newUsername: event.target.value,
        })
    }

    emailHandle(event) {
        this.setState({
            newEmail: event.target.value,
        })
    }

    changeUsername() {
        console.log("__newUsername: " + this.state.newUsername);

        let requestObject = {
            name: this.state.newUsername,
        }
        
        // need request url ex
        /*Axios.get(`${urls.remote}/user/1`).then(function(result) {
            console.log(result);
        })*/

    }

    changeEmail() {
        console.log("__newEmail: " + this.state.newEmail);
        
        let requestObject = {
            email: this.state.newEmail,
        }

        // need request url ex
        /*Axios.get(`${urls.remote}/user/1`).then(function(result) {
            console.log(result);
        })*/
    }

    deleteAccount() {
        console.log("__deleteAccount");

        // need request url ex
        /*Axios.get(`${urls.remote}/user/1`).then(function(result) {
            console.log(result);
        })*/
    }

    render() {
        return(
            <div className="card align-content-left" id="contain-settings">    
                <div className="card-body"> 

                    <h1 className="card-title">Settings</h1>
                    <p>This page allows you to adjust profile and account settings.</p>

                    <div className="card-body" id="change-username">
                        <h5 className="card-text">Change Your Account Username</h5>
                        <form>
                            <input type="text" className="form-control formInput" placeholder="example: recyclingman1" value={this.state.newUsername} onChange={this.usernameHandle}></input>
                            <button className="btn btn-primary formButton" onClick={this.changeUsername}>Change Username</button>
                        </form>
                    </div>

                    <div className="card-body" id="change-email">
                        <h5 className="card-text">Change Your Account Email</h5>
                        <form className="banuser">
                            <input type="email" className="form-control formInput" placeholder="example: recyclingman1@gmail.com" value={this.state.newEmail} onChange={this.emailHandle}></input>
                            <button className="btn btn-primary formButton" onClick={this.changeEmail}>Change Email</button>
                        </form>
                    </div>

                    <div className="card-body" id="delete-account">
                        <h5 className="card-text">Delete Your Account</h5>
                        <form>
                            <button className="btn btn-danger formButton" onClick={this.deleteAccount}>Delete Account</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}
