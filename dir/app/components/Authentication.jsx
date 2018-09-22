import React from 'react'
import GoogleLogin from 'react-google-login';

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
            email: "",
            password: "",
            firstname: "",
            lastname: "", 
            accountType: "",
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
        this.emailHandle = this.emailHandle.bind(this);
        this.passwordHandle = this.passwordHandle.bind(this);
        this.firstHandle = this.firstHandle.bind(this);
        this.lastHandle = this.lastHandle.bind(this);
        this.typeHandle = this.typeHandle.bind(this);
    }
    toggleAuthForm() {
        this.setState({signinTog: !signinTog});
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
    }
    signup() {

    }
    render() {
        let bodyContent;
        if (this.state.signinTog == true) {
            bodyContent = <div className="card-body">
            <h3 className="card-title">Sign In</h3>
            
            <form>
                <input type="text" className="form-control authInput" placeholder="Email Address" value={this.state.email} onChange={this.emailHandle}></input>
                <input type="password" className="form-control authInput" placeholder="Password" value={this.state.password} onChange={this.passwordHandle}></input>
                <GoogleLogin
                buttonText = "Sign In with Google"
                className = "btn btn-secondary"
            />    
                <button className="btn btn-primary authButton" onClick={this.signin}>Log In</button>
            </form>
        </div>;
        }
        else {
            bodyContent = <div className="card-body">
            <h3 className="card-title">Sign Up for Free</h3>
            
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
                <GoogleLogin
                buttonText = "Sign Up with Google"
                className = "btn btn-secondary"
            />
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
                        {bodyContent}
                    </div>
                </div>
            </div>
        );
    }
}