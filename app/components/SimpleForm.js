import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      geocodeResults: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this);
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // handleChange(event) {
  //   var value = event.target.value;

  //   this.setState(function () {
  //     return {
  //       address: value
  //     }
  //   });
  // }

  // handleFormSubmit(event) {
  //   event.preventDefault();

  //   this.props.onSubmit(
  //     this.props.address
  //   );
  // }

  handleSelect(address) {
    this.setState({
      address
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
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

  handleChange(address) {
    this.setState({
      address
    })
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

  // handleFormSubmit(event) {
  //   event.preventDefault();

  //     this.state.onSubmit(
  //       this.state.address,
  //       this.props.address
  //     );

  //   geocodeByAddress(this.state.address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error))
  // }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Enter Address or Location"
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
      // <form onSubmit={this.handleFormSubmit} className='form'>
        <div>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          autocompleteItem={AutocompleteItem}
          inputProps={inputProps}
          classNames={cssClasses}
            />
        <button type="submit" className='button'>Confirm</button>
        </div>
      // </form>
    )
  }
}

// export default SimpleForm;

module.exports = SimpleForm;