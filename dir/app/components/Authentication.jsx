
import React from 'react'

import history from './history.js'
import axios from 'axios'
import urls  from './Urls.js'
import Autocomplete from 'react-google-autocomplete'

//TODO change ui

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
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.userHandle = this.userHandle.bind(this);
        this.addressHandle = this.addressHandle.bind(this);
        this.cityHandle = this.cityHandle.bind(this);
        this.stateHandle = this.stateHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        this.cityHandle = this.cityHandle.bind(this);
        this.stateHandle = this.stateHandle.bind(this);
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
    cityHandle(event) {
        this.setState({
            city: event.target.value,
        });
    }
    stateHandle(event) {
        this.setState({
            state: event.target.value,
        })
    }
    addressHandle(event) {
        this.setState({
            address: event.target.value,
        });
    }
    cityHandle(event) {
        this.setState({
            city: event.target.value,
        });
    }
    stateHandle(event) {
        this.setState({
            state: event.target.value,
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
            window.localStorage.setItem('useremail', user.email);
            window.localStorage.setItem('token', result.data.token);
            axios.get(`http://recyclr.xyz/user/${window.localStorage.getItem('userid')}`, {headers:{'Access-Control-Allow-Origin': '*','Authorization': 'Bearer ' + window.localStorage.getItem('token') }})
            .then(function(result) {
                window.localStorage.setItem('is_company', result.data.is_company);
                history.push('/settings');
            });

        }).catch(function(error) {
            console.log(error);
            _this.setState({alert: true});
        });
    }
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
            axios.post(`http://recyclr.xyz/user`, newObj).then(function(result) {

                _this.setState({signinTog: false});
            }).catch(function(error) {
                console.log(error);
                _this.setState({alert: true});
            });
        }
        else {
            axios.post(`http://recyclr.xyz/company`, newObj).then(function(result) {
    
                _this.setState({signinTog: false});
            }).catch(function(error) {
                console.log(error);
                _this.setState({alert: true});
            });
        }
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
                <div className="form-group">
                    <input type="text" className="form-control " placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control " placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                </div>
                
            </form>
            <button className="btn btn-primary authButton" onClick={this.signin}>Log In</button>
        </div>;
        }
        else {
            bodyContent = <div className="card-body">
            <h3 id="signUpHeading" className="card-title">Sign Up for Free</h3>
            <form>
                <input type="text" className="form-control " placeholder="Username" value={this.state.firstname} onChange={this.userHandle}></input>
                <Autocomplete
                                    className="form-control"
                                    onPlaceSelected={(place) => {this.setState({address: place.formatted_address, city: place.address_components[2].long_name, state: place.address_components[5].long_name})}}
                                    types={['address']}
                                    componentRestrictions={{country: 'USA'}}
                                />
                
                <input type="text" className="form-control" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                <select className="form-control " value={this.state.accountType} onChange={this.typeHandle}>
                    <option value="f">Recyclr</option>
                    <option value="t">Business</option>
                </select>
            </form>
            <button className="btn btn-primary" onClick={this.signup}>GET STARTED</button>
        </div>;
        }
        return(
            <div className="row d-flex align-content-center justify-content-center">
                <div className="col-6">
                    <div className="card text-center">
                            <ul className="nav nav-pills justify-content-center">
                                <li className="nav-item ">
                                    <a className="nav-link active" data-toggle="pill" onClick={() => this.setState({signinTog: !this.state.signinTog})}>Sign In</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" data-toggle="pill" onClick={() => this.setState({signinTog: !this.state.signinTog})}>Sign Up</a>
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
