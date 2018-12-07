
import React from 'react'

import history from './history.js'
import axios from 'axios'
import urls from './Urls.js'
import Autocomplete from 'react-google-autocomplete'
import toastr from 'toastr'
import api from './api.js'

//TODO change ui

/*Handles both login and signup.*/
export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            address: "",
            city: "",
            USstate: "",
            username: "",
            accountType: "f",
            city: '',
            state: '',
            alert: false,
        };
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.userHandle = this.userHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        this.signin = this.signin.bind(this);
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
    typeHandle(event) {
        this.setState({
            accountType: event.target.value,
        });
    }
    //City, Address, and State handles where removed due to them not being used

    //{{'Authentication': 'Bearer ' + window.localStorage.token}}
    /*This function checks to make sure the email and password the user has entered exist in the database, and returns 400 if it's
    valid, or one of the various error codes depending on the problem*/
    signin(event) {
        let obj = {
            email: this.state.email,
            passwd: this.state.password,
        }
        let _this = this;
        api.post(`/signin`, obj).then(function (result) {
            console.log(result);
            let user = {
                email: _this.state.email,
                name: result.data.user_name,
                user_id: result.data.user_id,
            }

            window.localStorage.setItem('userid', user.user_id);
            window.localStorage.setItem('username', user.name);
            window.localStorage.setItem('useremail', user.email);
            window.localStorage.setItem('token', result.data.token);
            api.get(`/user/${window.localStorage.getItem('userid')}`)
                .then(function (result) {
                    window.localStorage.setItem('is_company', result.data.is_company);
                    toastr.options.closeButton = true;
                    toastr.success("Successfully signed in", "Success!");
                    history.push('/settings');
                });

        }).catch(function (error) {
            console.log(error);
            _this.setState({ alert: true });
            toastr.options.closeButton = true;
            toastr.error("Failed to sign in", "Error");
        });
    }
    /*This function requires all form data to be entered, and will post it to the database when the user clicks the button. It also
    specifies if the account is a user or a company*/
    signup() {
        let newObj = {
            address: this.state.address,
            user_name: this.state.username,
            email: this.state.email,
            passwd: this.state.password,
            is_company: this.state.accountType,
            city: this.state.city,
            state: this.state.state,
        }
        let _this = this;
        //call create user
        if (this.state.accountType === 'f') {
            api.post(`/user`, newObj)
                .then(function (result) {
                    _this.setState({ signinTog: false });
                    toastr.options.closeButton = true;
                    toastr.success("Successfully created new account", "Success!");
                    history.push("/auth");
                }).catch(function (error) {
                    console.log(error);
                    _this.setState({ alert: true });
                    toastr.options.closeButton = true;
                    toastr.error("Could not create new account. Please try again", "Error");
                });
        }
        else {
            api.post(`/company`, newObj)
                .then(function (result) {
                    _this.setState({ signinTog: false });
                    toastr.options.closeButton = true;
                    toastr.success("Successfully created new account", "Success!");
                }).catch(function (error) {
                    console.log(error);
                    _this.setState({ alert: true });
                    toastr.options.closeButton = true;
                    toastr.error("Could not create new account. Please try again", "Error");
                });
        }
    }

    /*Renders two different tabs for the user to choose between if they are making a new account, or loggin in, and provides them with the respective forms*/
    render() {
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
                <h3 id="signinHeading" className="card-title">Sign In</h3>
                <form>
                    <div className="form-group">
                        <input type="email" className="form-control " placeholder="Email Address" value={this.state.email} onChange={this.emailHandle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control " placeholder="Password" value={this.state.password} onChange={this.passwordHandle} required></input>
                    </div>

                </form>
                <button type='submit' className="btn btn-primary" onClick={this.signin} id="loginBtn">Log In</button>
            </div>;
        }
        else {
            bodyContent = <div className="card-body">
                <h3 id="signUpHeading" className="card-title">Sign Up for Free</h3>
                <form>
                    <div className="form-group">
                        <input id="uForm" type="text" className="form-control " placeholder="Username" value={this.state.username} onChange={this.userHandle} required></input>
                    </div>
                    <div className="form-group">
                        <Autocomplete
                            className="form-control"
                            onPlaceSelected={(place) => { this.setState({ address: place.formatted_address, city: place.address_components[2].long_name, state: place.address_components[5].long_name }) }}
                            types={['address']}
                            componentRestrictions={{ country: 'USA' }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input id="eForm" type="email" className="form-control" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle} required></input>
                    </div>
                    <div className="form-group">
                        <input id="pForm" type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.passwordHandle} required></input>
                    </div>
                    <div className="form-group">
                        <label for="typeSelect">Are you a Business or a Recyclr?</label>
                        <select id="tForm" name="typeSelect" className="form-control " value={this.state.accountType} onChange={this.typeHandle} required>
                            <option value="f">Recyclr</option>
                            <option value="t">Business</option>
                        </select>
                    </div>
                </form>
                <button className="btn btn-primary" onClick={this.signup} id="signUpBtn">Get Started</button>
            </div>;
        }
        return (
            <div className="row d-flex align-content-center justify-content-center">
                <div className="col-6">
                    <div className="card text-center">
                        <ul  className="nav nav-pills justify-content-center">
                            <li  className="nav-item ">
                                <a id="navLink1" className="nav-link active" data-toggle="pill" onClick={() => this.setState({ signinTog: !this.state.signinTog })}>Sign In</a>
                            </li>
                            <li className="nav-item ">
                                <a id="navLink2" className="nav-link" data-toggle="pill" onClick={() => this.setState({ signinTog: !this.state.signinTog })}>Sign Up</a>
                            </li>
                        </ul>

                        {alert}
                        {bodyContent}
                    </div>
                </div>
            </div>
        );
    }
}
