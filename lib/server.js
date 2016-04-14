import express from 'express';
import figshareRoute from './routes/figshare';
import dataciteRoute from './routes/datacite';
import dataOneRoute from './routes/dataone';

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
app.use('/dataone', dataOneRoute);
app.use('/datacite', dataciteRoute);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(3000);
console.log('App listening on localhost:3000');
