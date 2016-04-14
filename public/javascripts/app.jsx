'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

window.onload = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory}>
                {routes}
            </Router>
        </Provider>,
        document.getElementById('main-content')
    );
};
