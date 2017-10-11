/** YELP API CODE 
 ******************/
var yelp = require('yelp-fusion'); 
// Yelp Fusion API
const token  = 'zb1p8LlaSDttz_8TXaEenGYv5UEF8Z6VoenBSzT873EIdec7hvcqvemcwkrTqtvYAqUyodgrviFIDcu7nZ8h3XOJ7OeopEgkdM8Nb-lgtIOEglYVucHb1GTmZWceWXYx';
const client = yelp.client(token);
const app = express();
const express = require('express');
const router = express.Router();

app.get('/cafes', function(req, res) {
  client.search({
    term: 'cafe',
    location: '90012'
  })
  .then(response => res.send(response))
  .catch(e => console.log(e));
});