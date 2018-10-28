import React from 'react';
import Navigation from './Navigation.jsx';
import AuthPage from './Authentication.jsx';
import Settings from './Settings.jsx';
import Calendar from './calendar.jsx';
import AdminPage from './Admin.jsx';
import Payment from './Stripe.jsx';
import Progress from './Progress.jsx';
import createListing from './createListing.jsx';
import Listings from './Listings.jsx';
import GoogleAuth from './googleAuth.jsx';
import {Switch} from 'react-router-dom';
import history from './history.js';
import ChatSelect from './chatSelect.jsx'
import {Route, Router} from 'react-router-dom';
import ChatRoom from './ChatRoom.jsx';




export default class App extends React.Component {
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
            <Route exact path={'/'} component={AuthPage}/>
            <Route path={'/auth'} component={AuthPage}/>
            <Route path={'/settings'} component={Settings}/>
            <Route path={'/chat'} component={ChatRoom}/>
            <Route path={'/listings'} component={Listings}/>
            <Route path={'/admin'} component={AdminPage}/>
            <Route path={'/googleAuth'} component={GoogleAuth}/>
            <Route path={'/createListing'} component={createListing}/>
            <Route path={'/calendar'} component={Calendar}/>
            <Route path={'/payment'} component={Payment}/>
            <Route path={'/chatselect'} component={ChatSelect}/>
            <Route path={'/chatroom/:id'} component={ChatRoom}/>
            <Route path={'/choose_date/:id'} component={Calendar}/>
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
