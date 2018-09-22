import React from 'react'
import GoogleLogin from 'react-google-login';

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinTog: true,
        };
        //this.toggleAuthForm = toggleAuthForm.bind(this);
    }
    toggleAuthForm() {
        this.setState({signinTog: !signinTog});
    }
    render() {
        let bodyContent;
        if (this.state.signinTog == true) {
            bodyContent = <div className="card-body">
            <h3 className="card-title">Sign In</h3>
            <GoogleLogin
                buttonText = "Sign In with Google"
                className = "btn btn-secondary"
            />
            <form>
                <input type="text" className="form-control authInput" placeholder="Email Address"></input>
                <input type="password" className="form-control authInput" placeholder="Password"></input>
                
                <button className="btn btn-primary authButton">Log In</button>
            </form>
        </div>;
        }
        else {
            bodyContent = <div className="card-body">
            <h3 className="card-title">Sign Up for Free</h3>
            <GoogleLogin
                buttonText = "Sign Up with Google"
                className = "btn btn-secondary"
            />
            <form>
                <div className="form-row">
                    <div className="col-6">
                       <input type="text" className="form-control authInput" placeholder="Fisrt Name"></input>
                    </div>
                    <div className="col-6">
                        <input type="text" className="form-control authInput" placeholder="Last Name"></input>
                    </div>
                </div>
                <input type="text" className="form-control authInput" placeholder="Email Address"></input>
                <input type="password" className="form-control authInput" placeholder="Password"></input>
                <select className="form-control authSelect">
                    <option value="Recyclr">Recyclr</option>
                    <option value="Business">Business</option>
                </select>
                <button className="btn btn-primary authButton">GET STARTED</button>
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