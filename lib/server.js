import express from 'express';
import figshareRoute from './routes/figshare';
import dataOneRoute from './routes/dataone';
import dataciteRoute from './routes/datacite';
import notFoundError from './middleware/notFoundError';
import serverError from './middleware/serverError';
import staticAssets from './middleware/staticAssets';
import bowerComponents from './middleware/bowerComponents';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(staticAssets);
app.use(bowerComponents);

// Router middleware
app.use('/figshare', figshareRoute);
app.use('/dataone', dataOneRoute);
app.use('/datacite', dataciteRoute);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Node app is running on port', app.get('port'));
  /* eslint-enable no-console */
});
