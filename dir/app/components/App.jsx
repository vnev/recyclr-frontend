import React, { Component } from 'react';
import Navigation from './Navigation.jsx';
import AuthPage from './Authentication.jsx';
import Settings from './Settings.jsx';
<<<<<<< HEAD
import listItem from './listingItem.jsx';
=======
import AdminPage from './Admin.jsx';
>>>>>>> 9d48f2b75c23d6e6040a235fde181055e2e0d34b
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
            <Route exact path={'/'} Component={AuthPage}/>
            <Route path={'/auth'} component={AuthPage}/>
            <Route path={'/settings'} component={Settings}/>
<<<<<<< HEAD
            <Route path={'/listingItem'} component={listItem}/>
=======
            <Route path={'/admin'} component={AdminPage}/>
>>>>>>> 9d48f2b75c23d6e6040a235fde181055e2e0d34b
          </Switch>
          </div>
        </div>
        
      </div>
      
      </div>
      </Router>
    );
  }
}
