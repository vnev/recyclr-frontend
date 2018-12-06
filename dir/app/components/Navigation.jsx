import React from 'react';
import axios from 'axios';
import history from './history.js'

/*Navigation renders tabs of all the different our app that allow quick access to each feature. The NavBar changes slightly depending on the user type currently logged in*/
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogedIn: false,
        };

        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        let requestObject = {
            user_id: parseInt(window.localStorage.getItem('userid')),
        }
        axios.post(`http://recyclr.xyz/api/user/logout`, requestObject, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('token'), 'Access-Control-Allow-Origin': '*' } })
            .then(function (result) {
                window.localStorage.clear();
                history.push('/auth');
            }).catch(function (error) {
                console.log(error);
                toastr.options.closeButton = true;
                toastr.error("Error signing out. Please try again", "Error");
            })
    }

    render() {
        let but;
        if (window.localStorage.getItem('userid') === null) {
            but = <li className="nav-item">
                <a className="nav-link" href="/auth">Log In</a>
            </li>
        }
        else {
            but = <li className="nav-item">
                <a className="nav-link" onClick={this.logOut}>Sign Out</a>
            </li>
        }
        var view;
        if (window.localStorage.getItem('is_company') === 'true') {
            view = <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/listings">Listings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/messages">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/settings">My Settings</a>
                    </li>
                </ul>
                {but}
            </div>;
        }
        else if (window.localStorage.getItem('is_company') === 'false') {
            view = <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/createListing">Create Listing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/messages">Messages</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/progress">My Progress</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/settings">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/invoiceHistory">Invoice History</a>
                    </li>
                    {but}
                </ul>
            </div>;
        }
        else if (window.localStorage.getItem('is_company') === null) {
            view = <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {but}
                </ul>
            </div>;
        }
        return (

            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <a className="rootLink" style={{ fontFamily: "Yeseva One", fontSize: "28px" }} href="/">Recyclr</a>
                </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {view}

            </div>
        );
    }
}
