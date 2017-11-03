import express from 'express';
import open from 'open';
import routes from './routes';
require('dotenv').config();

const port = 3000;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.use('/', routes);

// app.listen(port, function (error) {
//   if(error) {
//     console.log(error);
//   } else {
//     open(`http://localhost:${port}`)
//   }
// });

app.listen(app.get("port"));