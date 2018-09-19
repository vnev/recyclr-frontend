import React from 'react';
import Navigation from './Navigation.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Navigation></Navigation>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Time to <a href="https://facebook.github.io/react/">React</a>.</h5>
          </div>
        </div>
        
      </div>
    );
  }
}
