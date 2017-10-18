import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// var SimpleForm = require('./SimpleForm');
var Maps = require('./Maps');

function AddressPreview (props) {
  return (
    <div>
      {props.value}
    </div>
  )
}

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(address) {
    this.setState({
      address
    })
  }

  handleSelect(address) {
    this.setState({
      address
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.address
    )
  }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Enter Address or Location",
      id: 'address'
    }
    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'autocomplete-container',
      autocompleteItem: 'autocomplete-item',
      autocompleteItemActive: 'autocomplete-item-active',
      googleLogoContainer: 'google-logo-container',
      googleLogoImage: 'google-logo-image'
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    return (
      <form onSubmit={this.handleFormSubmit} className='form'>
        <div>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          autocompleteItem={AutocompleteItem}
          inputProps={inputProps}
          classNames={cssClasses}
            />
        <button type="submit" className='button'>Confirm</button>
        </div>
      </form>
    )
  }
}

SimpleForm.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originAddress: '',
      destinationAddress: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(id, address) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Address'] = address;
      return newState;
    });
  }

  render() {
    var originAddress = this.state.originAddress;
    var destinationAddress = this.state.destinationAddress;

    return (
      <div className='home-container'>
        <div className='address-input'>
          <h4>Starting Location</h4>
            {!originAddress &&
              <SimpleForm
                id='origin'
                onSubmit={this.handleFormSubmit}
              />}
            <Maps />
        </div>
        <div className='address-input'>
          <h4>Trip Destination</h4>
            {!destinationAddress &&
              <SimpleForm
                id='destination'
                onSubmit={this.handleFormSubmit}
              />}
            <Maps />
        </div>
      </div>
    )
  }
}

module.exports = Home;