import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navigation2 extends Component {
    render() {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="nav-brand" to="/">Recyclr</Link>
                    </div>
                    <ul className="nav navbar-nav">
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
                </div>
            </nav>
        );
    }
}