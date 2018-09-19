import React from 'react';


export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return(
            <div className="navbar navbar-dark bg-primary">
                <a className="navbar-brand">Recyclr</a>
                <ul className="navbar-nav">
                    <li className="nav-link">Sign In</li>
                </ul>
            </div>
        );
    }
}