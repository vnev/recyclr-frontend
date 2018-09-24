import React from 'react';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    banUser() {
        //Add functionality and figure out what
    }

    render() {
        return(
            <div className="row align-content-left ">
                <div className="col">
                    <h3 className="title">Admin Tools </h3>
                    <button className="btn btn-primary banButton" onClick={this.banUser}>Ban User</button>
                </div>
            </div>
        );
    }

}