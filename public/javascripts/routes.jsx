'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Results from './containers/Results';

export default (
  <Route component={App} path="/">
    <IndexRoute component={Home}/>
    <Route component={Results} path="results"/>
  </Route>
);