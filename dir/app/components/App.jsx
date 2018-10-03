import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import AuthPage from './Authentication.jsx';
import Settings from './Settings.jsx';
import Calendar from './Calendar.jsx';
import Progress from './Progress.jsx';
import listItem from './listingItem.jsx';
import AdminPage from './Admin.jsx';
import {Switch} from 'react-router-dom';
import createBrowserHistorty from 'history/createBrowserHistory';
import {Route, Router} from 'react-router';

const history = createBrowserHistorty();

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
      <div id="appBase" className="container-fluid">
        <div className="row">
          <div className="col">
            <Navigation></Navigation>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <Switch>
            <Route exact path={'/'} component={AuthPage}/>
            <Route path={'/auth'} component={AuthPage}/>
            <Route path={'/settings'} component={Settings}/>
            <Route path={'/listingItem'} component={listItem}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/choose_date'} component={Calendar}/>
            <Route path={'/progress'} component={Progress}/>
          </Switch>
          </div>
        </div>

      </div>

      </div>
      </Router>
    );
  }
}
