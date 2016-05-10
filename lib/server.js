import express from 'express';

import notFoundError from './middleware/notFoundError';
import serverError from './middleware/serverError';
import staticAssets from './middleware/staticAssets';
import bowerComponents from './middleware/bowerComponents';
import validateQueryParamaters from './middleware/validateQueryParameters';
import sendResponse from './middleware/sendResponse';

import searchFigshare from './repository-clients/searchFigshare';
import searchZenodo from './repository-clients/searchZenodo';
import searchDataOne from './repository-clients/searchDataOne';
import parseDataCiteArticles from './repository-mappers/datacite/parseDataCiteArticles';
import parseDataOneArticles from './repository-mappers/dataone/parseDataOneArticles';

import search from './routes/search';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(staticAssets);
app.use(bowerComponents);

app.use(validateQueryParamaters);
app.use('/search', search('figshare', searchFigshare, parseDataCiteArticles));
app.use('/search', search('zenodo', searchZenodo, parseDataCiteArticles));
app.use('/search', search('dataone', searchDataOne, parseDataOneArticles));
app.use(sendResponse);

app.use(notFoundError);
app.use(serverError);

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Node app is running on port', app.get('port'));
  /* eslint-enable no-console */
});
