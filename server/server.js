import express from 'express';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';

const port = 3000;
const app = express();
const compiler = webpack(config);
const projectRoot = path.resolve(__dirname, '../');
// const yelp = require('./yelp')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/** YELP API CODE 
 ******************/
// var yelp = require('yelp-fusion'); 
// // Yelp Fusion API
// const token  = '6DZUS2oCV38kFoiBfBMvtvgkqW593BWe1cZN1Qt92dlvu-FQUzSd3f8EyLoaHCD_QtFYSlnMAB37EgNyN3CV2Za01p6xMDEd_b4jZpI-QJAOS_k1vmRlGeTF34bUWXYx';
// const client = yelp.client(token);

// client.search({
//   term:'Four Barrel Coffee',
//   location: 'san francisco, ca'
// }).then(response => {
//   console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//   console.log(e);
// });
var yelp = require('yelp-fusion'); 
const token  = 'zb1p8LlaSDttz_8TXaEenGYv5UEF8Z6VoenBSzT873EIdec7hvcqvemcwkrTqtvYAqUyodgrviFIDcu7nZ8h3XOJ7OeopEgkdM8Nb-lgtIOEglYVucHb1GTmZWceWXYx';
const client = yelp.client(token);

app.get('/cafes', function(req, res) {
  client.search({
    term: 'cafe',
    location: '90012'
  })
  .then(response => res.send(response))
  .catch(e => console.log(e));
});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(projectRoot + '/public'));
// app.use('/static', express.static(path.join(__dirname + '/app')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(port, function (error) {
  if(error) {
    console.log(error);
  } else {
    open(`http://localhost:${port}`)
  }
});

    // "start": "webpack-dev-server --open"


  // "babel": {
  //   "presets": [
  //     "env",
  //     "react"
  //   ]
  // },