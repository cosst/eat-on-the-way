import React from 'react';
import PropTypes from 'prop-types';
var SimpleForm = require('./SimpleForm');

function AddressPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

class Home extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     originAddress: '',
  //     destinationAddress: '',
  //     originAddressImage: null,
  //     destinationAddressImage: null
  //   }
  // }
  render() {
    // var originAddress = this.state.playerOneName;
    // var playerOneImage = this.state.playerOneImage;
    // var playerTwoName = this.state.playerTwoName;
    // var playerTwoImage = this.state.playerTwoImage;

    return (
      <div className='home-container'>
        <div className='address-input'>
          <h4>Starting Location</h4>
            <SimpleForm 
            // id='originAddress'
            />
        </div>
        <div className='address-input'>
          <h4>Trip Destination</h4>
            <SimpleForm 
              // id='destinationAddress'
            />
        </div>
      </div>
    )
  }
}

module.exports = Home;