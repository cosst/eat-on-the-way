'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYelpBusinesses = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yelp = require('yelp-fusion');
var app = (0, _express2.default)();
var token = process.env.YELP_TOKEN;
var client = yelp.client(token);

function getYelpBusinesses(req, res) {
  var address = req.query.address;
  client.search({
    categories: 'restaurants, All',
    location: address,
    limit: 25,
    sort_by: 'rating',
    radius: 8046,
    open_now: true
  }).then(function (response) {
    return res.send(response);
  })
  // (in the then clause above) turn above into function that takes in response and modifies response to only returns key value pairs that I want
  .catch(function (e) {
    return console.log(e);
  });
};

exports.getYelpBusinesses = getYelpBusinesses;