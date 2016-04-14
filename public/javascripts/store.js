import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
  repoFilters: {
    DataCite: true,
    GitHub: false,
    BitBucket: false,
    FigShare: false,
    Zenodo: false,
  },
  query: {
    keywords: '',
  },
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
