'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var port = 3000;
var app = (0, _express2.default)();

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

app.listen(app.get("port"));