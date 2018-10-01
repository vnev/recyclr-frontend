import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
// Styling from https://react-bootstrap.github.io/components/navbar/

export default class Navigation extends Component {
    render() {
        return(
            <Navbar inverse fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Recyclr</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem>
                        <Link to="/admin">Admin</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/listingItem">Listings</Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem>
                        <Link to="/settings">Settings</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/auth">Log In</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/progress">My Progress</Link>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
