import express from 'express';
import { notFoundError, serverError, sassTranspiling, staticAssets, bowerComponents } from './Middleware';

const app = express();

app.use(staticAssets);
app.use(bowerComponents);

// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(3000);
console.log("App listening on localhost:3000")
