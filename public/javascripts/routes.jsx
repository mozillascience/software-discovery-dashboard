import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Results from './containers/Results';

export default (
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Results} path="results" />
  </Route>
);
