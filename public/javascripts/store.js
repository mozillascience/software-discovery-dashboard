import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
  repoFilters: {
    datacite: false,
    github: false,
    dataone: true,
    bitbucket: false,
    figshare: false,
    zenodo: false,
  },
  query: {
    fields: {
      keywords: '',
    },
    page: 1,
  },
  results: {},
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
