import React, { Component } from 'react'

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div class="container-fluid text-center">    
                <div class="col-sm-8 text-left"> 
                    <h1>Settings</h1>
                    <p>This page allows you to ajust profile and account settings.</p>
                    <h3>Name</h3>
                    <p>Lorem ipsum...</p>
                </div>
            </div>
        );
    }
}
