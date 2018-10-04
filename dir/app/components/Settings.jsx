import React from 'react';
import Axios from 'axios';
import history from './history.js'
// import urls  from './Urls.js';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: "",
            newEmail: "",
            newPass: "",
        };
        this.usernameHandle = this.usernameHandle.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.passHandle = this.passHandle.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
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
    passHandle(event) {
        this.setState({
            newPass: event.target.value,
        })
    }

    changeUsername() {
        console.log("__newUsername: " + this.state.newUsername);

        let requestObject = {
            name: this.state.newUsername,
        }
        
        // need request url ex
        Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'),  requestObject, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('token'),}},).then(function(result) {
            console.log(result);
        }).then(function(error) {
            console.log(error);
        })

    }

    changeEmail() {
        console.log("__newEmail: " + this.state.newEmail);
        
        let requestObject = {
            email: this.state.newEmail,
        }

        // need request url ex
        Axios.put(`http://recyclr.xyz/user/` + window.localStorage.getItem('userid'),  requestObject, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('token')}}).then(function(result) {
            console.log(result);
        }).then(function(error) {
            console.log(error);
        })
    }
    changePassword() {
        let newObj = {
            passwd: this.state.newPass,
        }
        Axios.put('http://recyclr.xyz/user/' + window.localStorage.getItem('userid'), newObj, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('token')}}).then(function(result) {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        })
    }

    deleteAccount() {
        console.log("__deleteAccount");
        Axios.get('http://recyclr.xyz/user/' + window.localStorage.getItem('userid') + '/delete').then(function(result) {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        });
        window.localStorage.removeItem('userid');
        window.localStorage.removeItem('useremail');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        history.push('/auth');
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
                        
                            <input type="text" className="form-control formInput" placeholder="example: recyclingman1" value={this.state.newUsername} onChange={this.usernameHandle}></input>
                            <button className="btn btn-primary formButton" onClick={this.changeUsername}>Change Username</button>
                        
                    </div>

                    <div className="card-body" id="change-email">
                        <h5 className="card-text">Change Your Account Email</h5>
                        <div className="banuser">
                            <input type="email" className="form-control formInput" placeholder="example: recyclingman1@gmail.com" value={this.state.newEmail} onChange={this.emailHandle}></input>
                            <button className="btn btn-primary formButton" onClick={this.changeEmail}>Change Email</button>
                        </div>
                    </div>
                    <div className="card-body" id="change-password">
                        <h5 className="card-text">Change Your Account Password</h5>
                        
                            <input type="password" className="form-control formInput" placeholder="example: recyclingman1" value={this.state.newPass} onChange={this.passHandle}></input>
                            <button className="btn btn-primary formButton" onClick={this.changePassword}>Change Password</button>
                        
                    </div>
                    <div className="card-body" id="delete-account">
                        <h5 className="card-text">Delete Your Account</h5>
                        
                            <button className="btn btn-danger formButton" onClick={this.deleteAccount}>Delete Account</button>
                        
                    </div>
                    

                </div>
            </div>
        );
    }
}
