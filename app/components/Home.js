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
        <SimpleForm />
      </div>
    )
  }
}

module.exports = Home;