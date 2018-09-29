import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navigation2 extends Component {
    render() {
        return(
            <div className="container-fluid">
                <nav className="navbar">
                    <Link className="nav-brand" to="/">Recyclr</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listingItem">Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth">Log In</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}