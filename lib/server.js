import express from 'express';

import notFoundError from './middleware/notFoundError';
import serverError from './middleware/serverError';
import staticAssets from './middleware/staticAssets';
import bowerComponents from './middleware/bowerComponents';
import validateQueryParamaters from './middleware/validateQueryParameters';
import validateRepoIsRequested from './middleware/validateRepoIsRequested';

import searchFigshareStrategy from './repository-clients/searchFigshare';
import parseSearchedFigshareArticlesStrategy from './repository-mappers/figshare/parseSearchedFigshareArticles';

import search from './routes/search';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(staticAssets);
app.use(bowerComponents);
app.use(validateQueryParamaters);

// Router middleware
//app.use('/', validateRepoIsRequested('figshare'), search(searchFigshareStrategy, parseSearchedFigshareArticlesStrategy));


// error handeling middleware
app.use(notFoundError);
app.use(serverError);

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Node app is running on port', app.get('port'));
  /* eslint-enable no-console */
});
