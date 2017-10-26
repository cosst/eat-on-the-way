import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

// convert meters to concatenated miles
function getMiles (distanceInMeters) {
  return (distanceInMeters*0.000621371192).toFixed(1)
}

class Business extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      business: props.business,
      eatAddress: props.business.location.display_address.join(', ')
    };
  }

  render() {
  var additionalTime = this.props.business.additionalTime;
  var arriveTimeValue = this.props.business.arriveTimeValue;
  var arriveTimeText = this.props.business.arriveTimeText;
  var seconds = additionalTime;
  var hours = Math.floor(additionalTime/3600);
  var minutes = Math.floor((seconds - (hours*3600))/60);
    return (
      <li className='biz-item'>
        <div className='biz-name'>{this.state.business.name}</div>
        <ul className='space-list-items'>
          <li>
            <img
              className='biz-image'
              src={this.state.business.image_url}
              alt={'Image for ' + this.state.business.name} />
          </li>
          <li className='left'>{this.state.business.rating} stars | ({this.state.business.review_count} reviews)</li>
          <li className='left'>{this.state.eatAddress}</li>
          <li className='left'>Arrive in:
          {arriveTimeValue < 600
            ? <span className='time-green'> {this.props.business.arriveTimeText}</span>
            : (arriveTimeValue < 1200
              ? <span className='time-orange'> {this.props.business.arriveTimeText}</span>
              : <span className='time-red'> {this.props.business.arriveTimeText}</span>
              )
          }
          </li>
          <li className='left'>Additional Drive Time: 
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
          </li>
          <li className='left'>Distance: {getMiles (this.state.business.distance)} mi</li>
          <li><a className='button' href={this.state.business.url} target='_blank'>
                    View On Yelp
              </a>
          </li>
        </ul>
      </li>
    )
  }
}

class BusinessList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      businesses: props.businesses,
      originAddress: props.originAddress,
      destinationAddress: props.destinationAddress
    };
      this.handleMostOnRouteSort = this.handleMostOnRouteSort.bind(this);
      this.handleEatSoonSort = this.handleEatSoonSort.bind(this);
      this.handleBestRatingSort = this.handleBestRatingSort.bind(this);
  }

  componentDidMount() {
    let matrix = new google.maps.DistanceMatrixService();

    this.state.businesses.map((business, index) => {
      var eatAddress = business.location.display_address.join(', ');

      matrix.getDistanceMatrix(
      {
        origins: [this.state.originAddress, eatAddress],
        destinations: [eatAddress, this.state.destinationAddress],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => this.setAdditionalTime(response, status, index));
    })
  }

  setAdditionalTime(response, status, index) {
    if (status == 'OK') {
      let additionalTime = (response.rows[1].elements[1].duration.value + response.rows[0].elements[0].duration.value) - response.rows[0].elements[1].duration.value;
      let arriveTimeValue = response.rows[0].elements[0].duration.value;
      let arriveTimeText = response.rows[0].elements[0].duration.text;
      
      let business = Object.assign({}, this.state.businesses[index], {additionalTime: additionalTime, arriveTimeValue: arriveTimeValue, arriveTimeText: arriveTimeText});

      let newBusinesses = this.state.businesses.slice(0);
      newBusinesses[index] = business;
      this.setState({
        businesses: newBusinesses
      });
    }    
  }

  handleMostOnRouteSort(event) {
    let newBusinesses = this.state.businesses.slice(0);
    newBusinesses.sort((a,b) => a.additionalTime - b.additionalTime);
    this.setState({
      businesses: newBusinesses
    });
  }

  handleEatSoonSort(event) {
    let newBusinesses = this.state.businesses.slice(0);
    newBusinesses.sort((a,b) => a.arriveTimeValue - b.arriveTimeValue);
    this.setState({
      businesses: newBusinesses
    });
  }

  handleBestRatingSort(event) {
    let newBusinesses = this.state.businesses.slice(0);
    newBusinesses.sort((a,b) => b.rating - a.rating);
    this.setState({
      businesses: newBusinesses
    });
  }

  render() {
    return (
      <div className='sort-by-buttons'>
        <button className='sort-button' onClick={this.handleMostOnRouteSort}>Most On Route</button>
        <button className='sort-button' onClick={this.handleEatSoonSort}>Eat Soon</button>
        <button className='sort-button' onClick={this.handleBestRatingSort}>Best Rating</button>
        <ul className='biz-list'>
          {this.state.businesses.map(function (business, originAddress, destinationAddress) {
            return (
              <Business 
                business={business}
                originAddress={originAddress}
                destinationAddress={destinationAddress}
                key={business.id} 
              />
            );
          })}
        </ul>
      </div>
    )
  }
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
              originAddress={this.props.originAddress}
              destinationAddress={this.props.destinationAddress}
            />}
      </div>
    )
  }
}

module.exports = Results;