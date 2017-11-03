'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require('dotenv').config();

// const port = 3000;
var app = (0, _express2.default)();
// import open from 'open';


if (process.env.NODE_ENV === 'production') {
  app.use(_express2.default.static('dist'));
}

app.use('/', _routes2.default);

// app.listen(port, function (error) {
//   if(error) {
//     console.log(error);
//   } else {
//     open(`http://localhost:${port}`)
//   }
// });

app.listen(process.env.PORT || 3000);