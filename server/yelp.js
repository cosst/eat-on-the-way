import express from 'express';

var yelp = require('yelp-fusion'); 
const app = express();
const token  = 'zb1p8LlaSDttz_8TXaEenGYv5UEF8Z6VoenBSzT873EIdec7hvcqvemcwkrTqtvYAqUyodgrviFIDcu7nZ8h3XOJ7OeopEgkdM8Nb-lgtIOEglYVucHb1GTmZWceWXYx';
const client = yelp.client(token);

function getYelpBusinesses (req, res) {
  client.search({
    term: 'cafe',
    location: '601 E 2nd St, Los Angeles, CA 90012',
    sort_by: 'rating',
    open_now: true
  })
  .then(response => res.send(response))
  .catch(e => console.log(e));
};

export {getYelpBusinesses};