import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// var SimpleForm = require('./SimpleForm');
var Maps = require('./Maps');
var Results = require('./Results');
var DriveTime = require('./DriveTime');

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
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          lat: lat,
          lng: lng,
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })
    }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.address,
      this.state.lat,
      this.state.lng
    )
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
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
            {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
            {!this.state.loading && this.state.geocodeResults ?
              <div className='geocoding-results'>{this.state.geocodeResults}</div> :
            null}
            {!this.state.loading && this.state.geocodeResults &&
          <button type="submit" className='button' disabled={!this.state.address}>Confirm</button>
            }
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
      destinationAddress: '',
      originLat: null,
      originLng: null,
      destinationLat: null,
      destinationLng: null,
      showResults: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleResultsSubmit = this.handleResultsSubmit.bind(this);
  }

  handleFormSubmit(id, address, lat, lng) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Address'] = address;
      newState[id + 'Lat'] = lat;
      newState[id + 'Lng'] = lng;
      return newState;
    });
  }

  handleReset(id) {
    this.setState({
      [id + 'Address']: '',
      [id + 'Lat']: null,
      [id + 'Lng']: null
    });
  }

  handleResultsSubmit() {
    this.setState({
      showResults: true
    });
  }

  render() {
    var originAddress = this.state.originAddress;
    var destinationAddress = this.state.destinationAddress;
    var originLat = this.state.originLat;
    var originLng = this.state.originLng;
    var destinationLat = this.state.destinationLat;
    var destinationLng = this.state.destinationLng;
    var showResults = this.state.showResults;

    return (
        <div><div className='row'>
          <div className='address-input'>
            <h4>Starting Location</h4>
              {!originAddress &&
                <SimpleForm
                  id='origin'
                  onSubmit={this.handleFormSubmit}
                />
              }
              {originAddress !== '' &&
                <div><Maps
                  name={this.state.originAddress}
                  lat={this.state.originLat}
                  lng={this.state.originLng}
                />
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'origin')}>
                    Reset
                </button></div>
              }
          </div>
          <div className='address-input'>
            <h4>Trip Destination</h4>
              {!destinationAddress &&
                <SimpleForm
                  id='destination'
                  onSubmit={this.handleFormSubmit}
                />}
              {destinationAddress !== '' &&
                <div><Maps
                  name={this.state.destinationAddress}
                  lat={this.state.destinationLat}
                  lng={this.state.destinationLng}
                />
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'destination')}>
                    Reset
                </button></div>
              }
          </div>
          {originAddress && destinationAddress &&
            <div className='drive-time'>
              <DriveTime
                origin={this.state.originAddress}
                destination={this.state.destinationAddress}
               />
            </div>
          }
          {showResults === false && originAddress && destinationAddress &&
            <button
              className='button'
              onClick={this.handleResultsSubmit}
            >
              Find Eats
            </button>
          }
        </div>
        <div>
          {showResults !== false &&
            <Results
              address={this.state.originAddress}
            />
          }
        </div></div>
    )
  }
}

module.exports = Home;