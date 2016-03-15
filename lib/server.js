import express from 'express';
import indexRoute from './routes/index';
import { notFoundError, serverError, sassTranspiling, staticAssets, bowerComponents } from './Middleware';

const app = express();

app.set('view engine', 'jade');

app.use(sassTranspiling);
app.use(staticAssets);
app.use(bowerComponents);

// Router middleware
app.use('/', indexRoute);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(3000);
console.log("App listening on localhost:3000")