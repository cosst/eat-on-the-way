import express from 'express';

var yelp = require('yelp-fusion');
const app = express();
const token  = 'zb1p8LlaSDttz_8TXaEenGYv5UEF8Z6VoenBSzT873EIdec7hvcqvemcwkrTqtvYAqUyodgrviFIDcu7nZ8h3XOJ7OeopEgkdM8Nb-lgtIOEglYVucHb1GTmZWceWXYx';
const client = yelp.client(token);

function getYelpBusinesses (req, res) {
  var address = req.query.address;
  client.search({
    categories: 'restaurants, All',
    location: address,
    limit: 25,
    sort_by: 'rating',
    radius: 8046,
    open_now: true
  })
  .then(response => res.send(response))
  // (in the then clause above) turn above into function that takes in response and modifies response to only returns key value pairs that I want
  .catch(e => console.log(e));
};

export {getYelpBusinesses};