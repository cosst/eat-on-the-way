import express from 'express';
import open from 'open';
import routes from './routes';

const port = 3000;
const app = express();

app.use('/', routes);

app.listen(port, function (error) {
  if(error) {
    console.log(error);
  } else {
    open(`http://localhost:${port}`)
  }
});