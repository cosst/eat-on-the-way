import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
var Maps = require('./Maps');
var Results = require('./Results');
var RouteTime = require('./RouteTime');

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
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
      // onBlur: () => { console.log('Blur event!'); },
      // onFocus: () => { console.log('Focused!'); },
      autoFocus: this.props.autoFocus,
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
      <div className='form-div'>
        <form onSubmit={this.handleFormSubmit} className='form'>
          <div className='autocomplete-div'>
            <PlacesAutocomplete
              onSelect={this.handleSelect}
              autocompleteItem={AutocompleteItem}
              inputProps={inputProps}
              classNames={cssClasses}
              autoFocus={this.props.autoFocus}
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
      </div>
    )
  }
}

AddressInput.propTypes = {
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

// find midpoint between origin and destination for Yelp search
    var originLatRad = originLat * (Math.PI/180);
    var originLngRad = originLng * (Math.PI/180);
    var destinationLatRad = destinationLat * (Math.PI/180);
    var destinationLngRad = destinationLng * (Math.PI/180);
    var Bx = Math.cos(destinationLatRad) * Math.cos(destinationLngRad - originLngRad);
    var By = Math.cos(destinationLatRad) * Math.sin(destinationLngRad - originLngRad);
    var yelpSearchLatRad = Math.atan2(Math.sin(originLatRad) + Math.sin(destinationLatRad),
              Math.sqrt( (Math.cos(originLatRad)+Bx)*(Math.cos(originLatRad)+Bx) + By*By ) );
    var yelpSearchLngRad = originLngRad + Math.atan2(By, Math.cos(originLatRad) + Bx);
    var yelpSearchLat = (yelpSearchLatRad / (Math.PI/180)).toFixed(6);
    var yelpSearchLng = (yelpSearchLngRad / (Math.PI/180)).toFixed(6);

// calculate distance between origin and destination to pass to Yelp search for radius
    var R = 6371e3;
    var φ1 = originLat * (Math.PI/180);
    var φ2 = destinationLat * (Math.PI/180);
    var Olong = originLng * (Math.PI/180);
    var Dlong = destinationLng * (Math.PI/180);
    var Δφ = (destinationLat - originLat) * (Math.PI/180);
    var Δλ = (destinationLng - originLng) * (Math.PI/180);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var distance = R * c;
    var yelpSearchRadius = distance/1.8;

    return (
        <div><div className='row'>
          <div className='address-input'>
            <h4>Starting Location</h4>
              {!originAddress &&
                <AddressInput
                  id='origin'
                  onSubmit={this.handleFormSubmit}
                  autoFocus={true}
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
                <AddressInput
                  id='destination'
                  onSubmit={this.handleFormSubmit}
                  autoFocus={false}
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
              Drive Time: <RouteTime
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
          {showResults !== false && originAddress !== '' && destinationAddress !== '' &&
            <Results
              originAddress={this.state.originAddress}
              destinationAddress={this.state.destinationAddress}
              yelpSearchLat={yelpSearchLat}
              yelpSearchLng={yelpSearchLng}
              yelpSearchRadius={yelpSearchRadius}
            />
          }
        </div></div>
    )
  }
}

module.exports = Home;