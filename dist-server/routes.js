'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yelp = require('./yelp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var router = express.Router();
// const compiler = webpack(config);
var projectRoot = _path2.default.resolve(__dirname, '../');
// import config from '../webpack.config.dev';
// import webpack from 'webpack';


// solving for CORS
app.use(function (req, res, next) {
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
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../app/index.html'));
});
app.get('/results', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../app/index.html'));
});
app.get('/maps', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../app/index.html'));
});
app.get('/drive-time', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../app/index.html'));
});

// Yelp API call
app.get('/cafes', _yelp.getYelpBusinesses);

exports.default = app;