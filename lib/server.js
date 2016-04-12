import express from 'express';
import figshareRoute from './routes/figshare';

import {
  notFoundError,
  serverError,
  staticAssets,
  bowerComponents,
} from './Middleware';

const app = express();

app.use(staticAssets);
app.use(bowerComponents);

// Router middleware
app.use('/figshare', figshareRoute);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(3000);
console.log('App listening on localhost:3000');
