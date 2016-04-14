import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
  repoFilters: {
    DataCite: false,
    GitHub: false,
    BitBucket: false,
    FigShare: false,
    Zenodo: false,
  },
  query: {
    author: 'Author',
    id: 'Placeholder Text for ID',
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
