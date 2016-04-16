import express from 'express';
import figshareRoute from './routes/figshare';
import dataOneRoute from './routes/dataone';
import githubRoute from './routes/github';

import {
  notFoundError,
  serverError,
  staticAssets,
  bowerComponents,
} from './Middleware';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(staticAssets);
app.use(bowerComponents);

// Router middleware
app.use('/figshare', figshareRoute);
app.use('/dataone', dataOneRoute);
app.use('/github', githubRoute);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
