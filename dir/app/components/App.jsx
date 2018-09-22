import React from 'react';
import Navigation from './Navigation.jsx';
import AuthPage from './Authentication.jsx';
import Settings from './Settings.jsx';
import AdminPage from './Admin.jsx';
import {Switch} from 'react-router-dom';
import createBrowserHistorty from 'history/createBrowserHistory';
import {Route, Router} from 'react-router';

const history = createBrowserHistorty();

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
      <div className="container-fluid">
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
            <Route path={'/admin'} component={AdminPage}/>
          </Switch>
          </div>
        </div>
        
      </div>
      
      </div>
      </Router>
    );
  }
}
