
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import history from './history.js'
import Axios from 'axios';
import urls from './Urls.js';
import toastr from 'toastr';

//TODO change ui
/*Allows users to sign in with their Google account*/
export default class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            address: "",
            username: "",
            accountType: "f",
            address: '',
            alert: false,
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.userHandle = this.userHandle.bind(this);
        this.addressHandle = this.addressHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
        this.GoogFailIn = this.GoogFailIn.bind(this);
        this.GoogFailUp = this.GoogFailUp.bind(this);
        this.GoogSuccessIn = this.GoogSuccessIn.bind(this);
        this.GoogSuccessUp = this.GoogSuccessUp.bind(this);


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
    addressHandle(event) {
        this.setState({
            address: event.target.value,
        });
    }
    //{{'Authentication': 'Bearer ' + window.localStorage.token}}

    GoogSuccessIn(responce) {
        console.log(responce);
        let _this = this;
        let newObj = {
            email: responce.profileObj.email,
            passwd: this.state.password,
        }
        Axios.post('http://recyclr.xyz/api/signin', newObj).then(function (result) {
            console.log(result);
            let user = {
                name: result.data.user_name,
                user_id: result.data.user_id,
                email: responce.profileObj.email,
            };
            window.localStorage.setItem('userid', user.user_id);
            window.localStorage.setItem('username', user.name);
            window.localStorage.setItem('useremail', user.email);
            //window.localStorage.setItem('zipcode', result.data.zipcode)
            window.localStorage.setItem('token', result.data.token);
            console.log(window.localStorage.getItem('userid'));
            history.push('/settings');
        }).catch(function (error) {
            console.log(error);
            _this.setState({ alert: true });
        });


    }
    GoogFailIn(responce) {
        console.log("Failed");
        console.log(responce);
        this.setState({ alert: true });
    }
    GoogSuccessUp(responce) {
        console.log(responce);
        let newObj = {
            email: responce.profileObj.email,
            name: responce.profileObj.name,
            passwd: this.state.password,
            address: this.state.address,
        };
        let _this = this;
        Axios.post('http://recyclr.xyz/api/user', newObj).then(function (result) {
            console.log(result);
            _this.setState({ signinTog: false });
        }).catch(function (error) {
            console.log(error);
            _this.setState({ alert: true });
        });
        //window.sessionStorage.setItem();
        //history.push('/auth');

    }
    GoogFailUp(responce) {
        console.log("Failed");
        console.log(responce);
        this.setState({ alert: true });
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



                <h3 id="signinHeading" className="card-title">Sign In</h3>


                <form>
                    <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>

                </form>
                <GoogleLogin
                    clientId="874168937531-i135rv9v06a5rkt2sj6c8f12l2tvud2j.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    className="btn btn-secondary"
                    onSuccess={this.GoogSuccessIn}
                    onFailure={this.GoogFailIn}
                />

            </div>;
        }
        else {
            bodyContent = <div className="card-body">

                <h3 className="card-title">Sign Up for Free</h3>





                <form>
                    <h4>For added security, we would like for you to come up with an additional password for Recyclr, as well as provide an address for your recycling pickups</h4>
                    <input type="text" className="form-control authInput" placeholder="Address" value={this.state.address} onChange={this.addressHandle}></input>
                    <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                    <select className="form-control authSelect" value={this.state.accountType} onChange={this.typeHandle}>
                        <option value="f">Recyclr</option>
                        <option value="t">Business</option>
                    </select>





                </form>
                <GoogleLogin
                    clientId="874168937531-eqlmo921f0k15mqm5rdlp0o2op317eps.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    className="btn btn-secondary"
                    onSuccess={this.GoogSuccessUp}
                    onFailure={this.GoogFailUp}
                />
            </div>;
        }
        return (
            <div className="row d-flex align-content-center justify-content-center" id="authRow">
                <div className="col-6">
                    <div className="card authCard text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills justify-content-center">
                                <li className="nav-item ">
                                    <a className="nav-link authNav active" data-toggle="pill" onClick={() => this.setState({ signinTog: !this.state.signinTog })}>Sign In</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link authNav" data-toggle="pill" onClick={() => this.setState({ signinTog: !this.state.signinTog })}>Sign Up</a>
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
