import React from 'react';
// var yelp = require('../../server/yelp');
var api = require('../utils/api');

function BusinessList (props) {
  return (
    <ul>
      {props.businesses.map(function (business, index) {
        return (
          <li key={business.name}>{business.name}</li>
        )
      })}
    </ul>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      businesses: null
    };
  }
  componentDidMount () {
    api.getRestaurants()
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
          : <BusinessList businesses={this.state.businesses} />}
      </div>
    )
  }
}

module.exports = App;