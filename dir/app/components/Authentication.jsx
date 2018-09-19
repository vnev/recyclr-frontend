import React from 'react'

export default class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div className="row align-items-center">
                <div className="col-8 offset-2">
                    <div className="card text-center">
                        <div className="card-header">
                            <ul className="nav nav-pills justify-content-center">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="pill">Sign In</a>                                   
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="pill">Sign Up</a>                                   
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Sign Up for Free</h3>
                            <form>
                                <div className="form-row">
                                    <div className="col-6">
                                       <input type="text" className="form-control" placeholder="Fisrt Name"></input>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" placeholder="Last Name"></input>
                                    </div>
                                </div>
                                <input type="text" className="form-control" placeholder="Email Address"></input>
                                <input type="password" className="form-control"placeholder="Password"></input>
                                <select className="form-control">
                                    <option value="Recyclr">Recyclr</option>
                                    <option value="Business">Business</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}