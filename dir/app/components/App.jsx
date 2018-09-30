import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import AuthPage from './Authentication.jsx';
import Settings from './Settings.jsx';
import Calendar from './calendar.jsx';
import listItem from './listingItem.jsx';
import AdminPage from './Admin.jsx';
import {Switch} from 'react-router-dom';
import history from './history.js';
import {Route, Router} from 'react-router';



export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
      <div id="appBase" className="container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Navigation></Navigation>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <Switch>
            <Route exact path={'/'} Component={AuthPage}/>
            <Route path={'/auth'} component={AuthPage}/>
            <Route path={'/settings'} component={Settings}/>
            <Route path={'/listingItem'} component={listItem}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/calendar'} component={Calendar}/>
          </Switch>
          </div>
        </div>

      </div>

      </div>
      </Router>
    );
  }
}
