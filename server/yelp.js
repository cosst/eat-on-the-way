import express from 'express';

var yelp = require('yelp-fusion');
const app = express();
const token  = process.env.YELP_TOKEN;
const client = yelp.client(token);

function getYelpBusinesses (req, res) {
  // var address = req.query.address;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var radius = req.query.radius;
  client.search({
    categories: 'restaurants, All',
    // location: address,
    latitude: latitude,
    longitude: longitude,
    limit: 25,
    sort_by: 'rating',
    radius: radius,
    open_now: true
  })
  .then(response => res.send(response))
  // (in the then clause above) turn above into function that takes in response and modifies response to only returns key value pairs that I want
  .catch(e => console.log(e));
};

export {getYelpBusinesses};