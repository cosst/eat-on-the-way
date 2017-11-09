import express from 'express';
import open from 'open';
import routes from './routes';
// require('dotenv').config();

// const port = 3000;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 3000);
  app.use(express.static('dist'));
}

app.use('/', routes);

if (process.env.NODE_ENV !== 'production') {
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
