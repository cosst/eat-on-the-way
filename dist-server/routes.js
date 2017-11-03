'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _yelp = require('./yelp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();
var router = express.Router();
var compiler = (0, _webpack2.default)(_webpackConfig2.default);
var projectRoot = _path2.default.resolve(__dirname, '../');

// solving for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// webpack dev middleware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: _webpackConfig2.default.output.publicPath
}));

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