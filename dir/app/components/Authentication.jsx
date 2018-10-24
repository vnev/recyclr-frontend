
import React from 'react'

import history from './history.js'
import axios from 'axios'
import urls  from './Urls.js'

//TODO change ui

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            address: "",
            username: "",
            accountType: "f",
            alert: false,
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.userHandle = this.userHandle.bind(this);
        this.addressHandle = this.addressHandle.bind(this);
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
    //{{'Authentication': 'Bearer ' + window.localStorage.token}}
    signin() {
        let obj = {
            email: this.state.email,
            passwd: this.state.password,
        }
        let _this = this;
        axios.post(`http://recyclr.xyz/signin`, obj).then(function(result) {
            console.log(result);
            let user = {
                email: _this.state.email,
                name: result.data.user_name,
                user_id: result.data.user_id,
            }
            window.localStorage.setItem('userid', user.user_id);
            window.localStorage.setItem('username', user.name);
            console.log(localStorage.getItem('username'));
            window.localStorage.setItem('useremail', user.email);
            ///window.localStorage.setItem('zipcode', result.data.zipcode);
            window.localStorage.setItem('token', result.data.token);
            history.push('/settings');
        }).catch(function(error) {
            console.log(error);
            _this.setState({alert: true});
        });

    }
    signup() {
        let newObj = {
            address: this.state.address,
            name: this.state.username,
            email: this.state.email,
            passwd: this.state.password,
            is_company: this.state.accountType,
        }
        let _this = this;
        console.log(newObj);
        //call create user
        axios.post(`http://recyclr.xyz/user`, newObj).then(function(result) {
            console.log(result);
            _this.setState({signinTog: false});
        }).catch(function(error) {
            console.log(error);
            _this.setState({alert: true});
        });


    }


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
                <input type="text" className="form-control authInput" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>


            </form>
            <button className="btn btn-primary authButton" onClick={this.signin}>Log In</button>
        </div>;
        }
        else {
            bodyContent = <div className="card-body">

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
                    <option value="f">Recyclr</option>
                    <option value="t">Business</option>
                </select>





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
                        <h2>Or, you can sign in using your <a href="/googleAuth">Google Account</a></h2>

                    </div>
                </div>
            </div>
        );
    }
}
