import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
var DriveTime = require('./DriveTime');

function BusinessList (props) {
  // convert meters to concatenated miles
  function getMiles (distanceInMeters) {
    return (distanceInMeters*0.000621371192).toFixed(1)
  }
  return (
    <ul className='biz-list'>
      {props.businesses.map(function (business, index) {
      // format display address
      var address1 = business.location.display_address[0];
      var address2 = business.location.display_address[1];
      var address3 = business.location.display_address[2];
      var businessAddress = [address1, address2, address3].filter(val => val).join(', ');
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
              <li className='left'>{businessAddress}</li>
              <li className='left'>Eating in <span className='green-text'>
                  <DriveTime
                    origin='601 E 2nd St, Los Angeles, CA, United States'
                    destination={businessAddress}
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
      address: props.address,
      businesses: null
    };
  }
  componentDidMount () {
    api.getBusinesses(this.props.address)
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
              address={this.state.address}
            />}
      </div>
    )
  }
}

module.exports = Results;