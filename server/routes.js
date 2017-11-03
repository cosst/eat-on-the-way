const express = require('express');
const app = express();
const router = express.Router();
// const compiler = webpack(config);
const projectRoot = path.resolve(__dirname, '../');

import path from 'path';
// import config from '../webpack.config.dev';
// import webpack from 'webpack';
import { getYelpBusinesses } from './yelp';

// solving for CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// webpack dev middleware
// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// serve static assets
app.use(express.static(projectRoot + '/public'));

// pages
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});
app.get('/results', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});
app.get('/maps', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});
app.get('/drive-time', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

// Yelp API call
app.get('/cafes', getYelpBusinesses);

export default app;