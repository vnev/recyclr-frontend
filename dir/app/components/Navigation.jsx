import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from './history.js'
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
// Styling from https://react-bootstrap.github.io/components/navbar/

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            isLogedIn: false,
        }
        
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        
    }
        

    logOut() {
        let requestObject = {
            user_id: parseInt(window.localStorage.getItem('userid')),
        }
        axios.post(`http://recyclr.xyz/user/logout`, requestObject, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}}).then(function(result) {
            console.log(result);
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('useremail');
            history.push('/auth');
        }).catch(function(error) {
            console.log(error);
        })
    }

    render() {
        let but;
            if (window.localStorage.getItem('username') === null) {
                but =   <li className="nav-item">
                            <Link className="nav-link" to="/auth">Log In</Link>
                        </li>
            }
            else {
                but =  <li className="nav-item">
                            <Link className="nav-link" onClick={this.logOut} to="/auth">Sign Out</Link>
                        </li>
            }
        return(
            
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <Link to="/">Recyclr</Link>
                </div>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listings">Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/progress">My Progress</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        {but}
                    </ul>
                </div>
            </div>

        );
    }
}
