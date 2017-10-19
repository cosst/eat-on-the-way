import React from 'react';
import ReactRouter from 'react-router-dom';
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Link = require('react-router-dom').Link;
var Switch = require('react-router-dom').Switch;
var PropTypes = require('prop-types');
var api = require('../utils/api');

var Home = require('./Home');
var Header = require('./Header');
var Results = require('./Results');
var Maps = require('./Maps');
var DriveTime = require('./DriveTime');

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/results' component={Results} />
            <Route path='/maps' component={Maps} />
            <Route path='/drive-time' component={DriveTime} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

module.exports = App;