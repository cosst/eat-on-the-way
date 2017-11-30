import express from 'express';
import routes from './routes';

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT);
  app.use(express.static('dist'));
}

app.use('/', routes);

if (process.env.NODE_ENV !== 'production') {
  var open = require('open');
  require('dotenv').config();
  const port = 3000;
  app.listen(port, function (error) {
    if(error) {
      console.log(error);
    } else {
      open(`http://localhost:${port}`)
    }
  });
}