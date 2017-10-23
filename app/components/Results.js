import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

// calculates additional driving time to each food option given origin and destination address
class AddedTime extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      originAddress: this.props.originAddress,
      eatAddress: this.props.eatAddress,
      destinationAddress: this.props.destinationAddress,
      routeDuration: null,
      toEatDuration: null,
      finalLegDuration: null
    };
  }

  componentDidMount() {
    const originAddress = this.state.originAddress;
    const eatAddress = this.state.eatAddress;
    const destinationAddress = this.state.destinationAddress;

    const matrix = new google.maps.DistanceMatrixService();

    // using eatAddress in both origins and destinations to get all trip leg times
    matrix.getDistanceMatrix({
        origins: [originAddress, eatAddress],
        destinations: [eatAddress, destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
      }, 
      this.renderDetails.bind(this)
    );
  }
  
  renderDetails(res, status) {
    // if request was successful, pulling necessary duration data
    if (status == 'OK') {
      this.setState({
        originAddress: res.originAddresses[0],
        eatAddress: res.originAddresses[1],
        destinationAddress: res.destinationAddresses[1],
        routeDuration: res.rows[0].elements[1].duration.value,
        toEatDuration: res.rows[0].elements[0].duration.value,
        finalLegDuration: res.rows[1].elements[1].duration.value
      });
    } else {
      console.log(status);
    }
  }

  render() {
    var additionalTime = (this.state.finalLegDuration + this.state.toEatDuration) - this.state.routeDuration;
    var seconds = additionalTime;
    var hours = Math.floor(additionalTime/3600);
    var minutes = Math.floor((seconds - (hours*3600))/60);
    return(
      <span>
        {hours === 0 && minutes !== 0
          ? (minutes < 10
              ? <span className='time-green'> {minutes} mins</span>
              : (minutes > 20
                  ? <span className='time-red'> {minutes} mins</span>
                  : <span className='time-orange'> {minutes} mins</span>
                )
            )
          : (hours === 0 && minutes === 0
              ? <span className='time-green'> no time added</span>
              : <span className='time-red'> {hours} hrs {minutes} mins</span>
            )
        }
      </span>
    );
  }
}

// calculates drive time to each restaurant option
class ArriveTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.originAddress,
      destination: this.props.eatAddress,
      duration: '',
      durationNumber: null
    };
  }

  componentDidMount() {
    const origin = this.state.origin;
    const destination = this.state.destination;
    const matrix = new google.maps.DistanceMatrixService();

    matrix.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      }, 
      this.renderDetails.bind(this)
    );
  }
  
  renderDetails(res, status) {
    if (status == 'OK') {
      this.setState({
        origin: res.originAddresses[0],
        destination: res.destinationAddresses[0],
        duration: res.rows[0].elements[0].duration.text,
        durationNumber: res.rows[0].elements[0].duration.value
      });
    } else {
      console.log(status);
    }
  }

  render() {
    var durationNumber = this.state.durationNumber;
    return(
      <span>
        {durationNumber < 600
          ? <span className='time-green'>{this.state.duration}</span>
          : (durationNumber < 1200
            ? <span className='time-orange'>{this.state.duration}</span>
            : <span className='time-red'>{this.state.duration}</span>
            )
        }
      </span>
    );
  }
}

function BusinessList (props) {
  // convert meters to concatenated miles
  function getMiles (distanceInMeters) {
    return (distanceInMeters*0.000621371192).toFixed(1)
  }
  var originAddress = props.originAddress;
  var destinationAddress = props.destinationAddress;
  return (
    <ul className='biz-list'>
      {props.businesses.map(function (business, index) {
      // format display address
      var address1 = business.location.display_address[0];
      var address2 = business.location.display_address[1];
      var address3 = business.location.display_address[2];
      var eatAddress = [address1, address2, address3].filter(val => val).join(', ');
        return (
          <li key={index} className='biz-item'>
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
              <li className='left'>Additional Drive Time: 
                  <AddedTime
                    originAddress={originAddress}
                    eatAddress={eatAddress}
                    destinationAddress={destinationAddress}
                  />
              </li>
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
          ? <Loading />
          : <BusinessList
              businesses={this.state.businesses}
              originAddress={this.state.originAddress}
              destinationAddress={this.state.destinationAddress}
            />}
      </div>
    )
  }
}

module.exports = Results;