import express from 'express';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import webpack from 'webpack';
import { getYelpBusinesses } from './yelp';

const port = 3000;
const app = express();
const compiler = webpack(config);
const projectRoot = path.resolve(__dirname, '../');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/cafes', getYelpBusinesses);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.static(projectRoot + '/public'));

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