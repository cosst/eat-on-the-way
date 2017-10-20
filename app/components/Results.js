import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

class ArriveTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.originAddress,
      destination: this.props.eatAddress,
      duration: ''
    };
  }

  componentDidMount() {
    // Some sample data plus a helper for the DistanceMatrixService.
    const origin = this.state.origin;
    const destination = this.state.destination;
    const matrix = new google.maps.DistanceMatrixService();

    // Get distance from Google API, if server responds, call renderDetails().
    matrix.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      }, 
      this.renderDetails.bind(this)
    );
  }
  
  renderDetails(res, status) {
    console.log(res);
    // If the request was successfull, fill our state with the distance data.
    if (status == 'OK') {
      this.setState({
        origin: res.originAddresses[0],
        destination: res.destinationAddresses[0],
        duration: res.rows[0].elements[0].duration.text
      });
    } else {
      console.log(status);
    }
  }

  render() {
    return(
        <span>{this.state.duration}</span>
    );
  }
}

function BusinessList (props) {
  // convert meters to concatenated miles
  function getMiles (distanceInMeters) {
    return (distanceInMeters*0.000621371192).toFixed(1)
  }
  var originAddress = props.originAddress;
  return (
    <ul className='biz-list'>
      {props.businesses.map(function (business, index) {
      // format display address
      var address1 = business.location.display_address[0];
      var address2 = business.location.display_address[1];
      var address3 = business.location.display_address[2];
      var eatAddress = [address1, address2, address3].filter(val => val).join(', ');
      // var businessAddress = business.location.display_address[0] + ', ' + business.location.display_address[1] + ', ' + business.location.display_address[2];
        return (
          // use index instead of business.name
          <li key={business.name} className='biz-item'>
            <div className='biz-name'>{business.name}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='biz-image'
                  src={business.image_url}
                  alt={'Image for ' + business.name} />
              </li>
              <li className='left'>{business.rating} stars | ({business.review_count} reviews)</li>
              <li className='left'>{eatAddress}</li>
              <li className='left'>Arrive in <span className='green-text'>
                  <ArriveTime
                    originAddress={originAddress}
                    eatAddress={eatAddress}
                  />
                </span></li>
              <li className='left'>Additional Drive Time: <span className='red-text'>20 minutes</span></li>
              <li className='left'>Distance: {getMiles (business.distance)} mi</li>
              <li><a className='button' href={business.url} target='_blank'>
                        View On Yelp
                  </a>
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

BusinessList.propTypes = {
  businesses: PropTypes.array.isRequired,
}

class Results extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      originAddress: props.originAddress,
      destinationAddress: props.destinationAddress,
      businesses: null
    };
  }
  componentDidMount () {
    api.getBusinesses(this.props.originAddress)
      .then(function (businesses) {
        this.setState(function () {
          return {
            businesses: businesses
          }
        })
      }.bind(this));
  }
  render () {
    return (
      <div>
        {!this.state.businesses
          ? <p>LOADING!</p>
          : <BusinessList
              businesses={this.state.businesses}
              originAddress={this.state.originAddress}
            />}
      </div>
    )
  }
}

module.exports = Results;