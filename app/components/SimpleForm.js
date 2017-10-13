import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  // handleFormSubmit = (event) => {
  //   event.preventDefault()

  //   geocodeByAddress(this.state.address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error))
  // }

  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.onChange,
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
      <form onSubmit={this.handleFormSubmit} className='form'>
        <PlacesAutocomplete
          autocompleteItem={AutocompleteItem}
          inputProps={inputProps}
          classNames={cssClasses}
            />
        <button type="submit" className='button'>Confirm</button>
      </form>
    )
  }
}

// export default SimpleForm;

module.exports = SimpleForm;