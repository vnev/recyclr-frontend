import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
// Styling from https://react-bootstrap.github.io/components/navbar/

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        if(localStorage.getItem('name') != null) {
            this.state = {
                isLogedIn: true,
             };
        } 
        else {
            this.state = {
                isLogedIn: false,
            }
        }
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        let requestObject = {
            user_id: window.localStorage.user.user_id
        }
        axios.post(`${urls.remote}/user/logout`, {requestObject}).then(function(result) {
            console.log(result);
        })
    }

    render() {
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
                            <Link className="nav-link" to="/listingItem">Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/progress">My Progress</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                        {!this.state.isLogedIn ?(
                             <li className="nav-item">
                                 <Link className="nav-link" to="/auth">Log In</Link>
                             </li>
                        ) : (
                            <li className="nav-item">
                                    <Link className="nav-link" onClick={this.logOut} to="/auth">Sign Out</Link>
                             </li>
                        )}
                    </ul>
                </div>
            </div>

        );
    }
}
