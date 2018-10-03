
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import history from './history.js';
import Axios from 'axios';
import urls  from './Urls.js';

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            address: "",
            username: "",
            accountType: "",
            alert: false,
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.userHandle = this.userHandle.bind(this);
        this.addressHandle = this.addressHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        this.signup = this.signup.bind(this);
        
    }
    emailHandle(event) {
        this.setState({
          email: event.target.value,
        });
    }
    passwordHandle(event) {
        this.setState({
          password: event.target.value,
        });
    }
    userHandle(event) {
        this.setState({
          username: event.target.value,
        });
    }
    lastHandle(event) {
        this.setState({
          lastname: event.target.value,
        });
    }
    typeHandle(event) {
        this.setState({
            accountType: event.target.value,
        });
    }
    addressHandle(event) {
        this.setState({
            address: event.target.value,
        });
    }
    signin() {
        localStorage.setItem('name', this.state.email);

        history.push('/');
    }
    signup() {
        let temp = false;
        if (this.state.accountType === "Business") {
            temp = true;
        }
        let newObj = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            is_company: temp,
        }
        
    }
    GoogSuccessIn(responce) {
        console.log(responce);
        
        history.push('/');
        
    }
    GoogFailIn(responce) {
        console.log("Failed");
        console.log(responce);
        this.setState({alert: true});
    }
    GoogSuccessUp(responce) {
        let temp = false;
        if (this.state.accountType === "Business") {
            temp = true;
        }
        console.log(responce);
        window.sessionStorage.setItem();
        history.push('/');
        
    }
    GoogFailUp(responce) {
        console.log("Failed");
        console.log(responce);
        this.setState({alert: true});
    }
    render() {
        let alert;
        if (this.state.alert == true) {
            alert = <div className="alert alert-danger alert-dismissible" role="alert">
            An error has occured. Please try again
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }
        let bodyContent;
        if (this.state.signinTog == true) {
            bodyContent = <div className="card-body">

            <h3 className="card-title">Sign In</h3>
            <GoogleLogin
                clientId = "874168937531-8h3f3gnsfpdc650s6nssegtsq1maujpo.apps.googleusercontent.com"
                buttonText = "Sign In with Google"
                className = "btn btn-secondary"
                onSuccess={() => this.GoogSuccessIn}
                onFailure={() => this.GoogFailIn}
                /> 

            <h3 id="signinHeading" className="card-title">Sign In</h3>
            

            <form>
                <input type="text" className="form-control authInput" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                   
                <button className="btn btn-primary authButton" onClick={this.signin}>Log In</button>
            </form>
        </div>;
        }
        else {
            bodyContent = <div className="card-body">

            <h3 className="card-title">Sign Up for Free</h3>
            <GoogleLogin
                clientId = "874168937531-8h3f3gnsfpdc650s6nssegtsq1maujpo.apps.googleusercontent.com"
                buttonText = "Sign Up with Google"
                className = "btn btn-secondary"
                onSuccess={() => this.GoogSuccessUp}
                onFailure={() => this.GoogFailUp}
                />

            <h3 id="signUpHeading" className="card-title">Sign Up for Free</h3>
            

            <form>
                <div className="form-row">
                    <div className="col-12">
                       <input type="text" className="form-control authInput" placeholder="Username" value={this.state.firstname} onChange={this.userHandle}></input>
                    </div>
                </div>
                <input type="text" className="form-control authInput" placeholder="Address" value={this.state.address} onChange={this.addressHandle}></input>
                <input type="text" className="form-control authInput" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                <select className="form-control authSelect" value={this.state.accountType} onChange={this.typeHandle}>
                    <option value="Recyclr">Recyclr</option>
                    <option value="Business">Business</option>
                </select>

                
                

                <GoogleLogin
                buttonText = "Sign Up with Google"
                className = "btn btn-secondary"
                id="googleBtn"
            />
                <button className="btn btn-primary authButton" onClick={this.signup}>GET STARTED</button>

            </form>
            <button className="btn btn-primary authButton" onClick={this.signup}>GET STARTED</button>
        </div>;
        }
        return(
            <div className="row d-flex align-content-center justify-content-center" id="authRow">
                <div className="col-6">
                    <div className="card authCard text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills justify-content-center">
                                <li className="nav-item ">
                                    <a className="nav-link authNav active" data-toggle="pill" onClick={() => this.setState({signinTog: !this.state.signinTog})}>Sign In</a>                                   
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link authNav" data-toggle="pill" onClick={() => this.setState({signinTog: !this.state.signinTog})}>Sign Up</a>                                   
                                </li>
                            </ul>
                        </div>
                        {alert}
                        {bodyContent}
                    </div>
                </div>
            </div>
        );
    }
}
