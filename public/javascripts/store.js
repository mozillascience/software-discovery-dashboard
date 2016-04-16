import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
  repoFilters: {
    GitHub: false,
    DataONE: true,
    BitBucket: false,
    FigShare: false,
    Zenodo: false,
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
