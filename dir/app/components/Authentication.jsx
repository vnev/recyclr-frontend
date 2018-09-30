import GoogleLogin from 'react-google-login';
import React, { Component } from 'react'
import history from './history.js'

export default class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            firstname: "",
            lastname: "", 
            accountType: "",
            alert: false,
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.firstHandle = this.firstHandle.bind(this);
        this.lastHandle = this.lastHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        
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
    firstHandle(event) {
        this.setState({
          firstname: event.target.value,
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
    signin() {
        console.log(this.state.email);
        console.log(this.state.password);
        window.sessionStorage.setItem();
        history.push('/');
    }
    signup() {
        window.sessionStorage.setItem();
        history.push('/');
        
    }
    GoogSuccess(responce) {
        console.log(responce);
        window.sessionStorage.setItem();
        history.push('/');
        
    }
    GoogFail(responce) {
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
                clientId = "803477624114-06eoah5tl9to667e88cbelgbm0q6msso.apps.googleusercontent.com"
                buttonText = "Sign In with Google"
                className = "btn btn-secondary"
                onSuccess={() => this.GoogSuccess}
                onFailure={() => this.GoogFail}
                /> 
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
                clientId = "803477624114-06eoah5tl9to667e88cbelgbm0q6msso.apps.googleusercontent.com"
                buttonText = "Sign Up with Google"
                className = "btn btn-secondary"
                onSuccess={() => this.GoogSuccess}
                onFailure={() => this.GoogFail}
                />
            <form>
                <div className="form-row">
                    <div className="col-6">
                       <input type="text" className="form-control authInput" placeholder="Fisrt Name" value={this.state.firstname}></input>
                    </div>
                    <div className="col-6">
                        <input type="text" className="form-control authInput" placeholder="Last Name" value={this.state.lastname}></input>
                    </div>
                </div>
                <input type="text" className="form-control authInput" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                <select className="form-control authSelect" value={this.state.accountType} onChange={this.typeHandle}>
                    <option value="Recyclr">Recyclr</option>
                    <option value="Business">Business</option>
                </select>
                
                <button className="btn btn-primary authButton" onClick={this.signup}>GET STARTED</button>
            </form>
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
