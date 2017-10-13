import React from 'react';
import PropTypes from 'prop-types';
var SimpleForm = require('./SimpleForm');

class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className='home-container'>
        <div className='address-input'>
          <h4>Starting Location</h4>
          <SimpleForm />
        </div>
        <div className='address-input'>
          <h4>Trip Destination</h4>
          <SimpleForm />
        </div>
      </div>
    )
  }
}

module.exports = Home;