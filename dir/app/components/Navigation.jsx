import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import history from './history.js'


export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            isLogedIn: false,
            isCompany: 'm',
        };
        
        this.logOut = this.logOut.bind(this);
    }
    getAccType() {
        let _this = this;
        axios.get(`http://recyclr.xyz/user/${window.localStorage.getItem('userid')}`, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token')}})
            .then(function(result) {
                if (result.data.is_company) {
                    _this.setState({
                        isCompany: 'y',
                    });
                }
                else {
                    _this.setState({
                        isCompany: 'n',
                    });
                }
            });
    }
    componentDidUpdate(prevProps, prevState, shit) {
        if (window.localStorage.getItem('userid') === null && this.state.isCompany.length === 0) {
            this.setState({
                isCompany: 'm'
            });
        }
        else if (window.localStorage.getItem('userid') !== null && this.state.isCompany === 'm') {
            this.getAccType();
        }
        else if (prevState.isCompany !== this.state.isCompany) {
            this.forceUpdate();
        }
    }
    logOut() {
        let requestObject = {
            user_id: parseInt(window.localStorage.getItem('userid')),
        }
        let _this = this;
        axios.post(`http://recyclr.xyz/user/logout`, requestObject, {headers:{'Authorization': 'Bearer ' + window.localStorage.getItem('token'),'Access-Control-Allow-Origin':'*'}})
        .then(function(result) {
            window.localStorage.clear();
            _this.setState({
                isCompany: 'm',
            }, () => {
                    history.push('/auth')
                });
        }).catch(function(error) {
            console.log(error);
        })
    }

    render() {
        let but;
        if (window.localStorage.getItem('userid') === null) {
            but =   <li className="nav-item">
                        <a className="nav-link" href="/auth">Log In</a>
                    </li>
        }
        else {
            but =  <li className="nav-item">
                        <a className="nav-link" onClick={this.logOut}>Sign Out</a>
                    </li>
        }
        var view;
        if (this.state.isCompany === 'y') {
            view = <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/listings">Listings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/chatselect">Chat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings">My Settings</a>
                        </li>
                    </ul>
                    
            </div>;
        }
        else if (this.state.isCompany === 'n') {
            view = <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/createListing">Create Listing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/chatselect">Chat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/progress">My Progress</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/settings">Settings</a>
                        </li>
                    </ul>
                    
            </div>;
        }
        else if (this.state.isCompany === 'm' || window.localStorage.getItem('userid') === null){
            view = null;
        }
        return(
            
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">
                    <a href="/">Recyclr</a>
                </div>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {view}
                <ul className="navbar-nav my-2 my-lg-0">
                        {but}
                </ul>
                </div>
            

        );
    }
}
