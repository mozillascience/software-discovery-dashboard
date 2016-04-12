import { combineReducers } from 'redux';
import repoFilters from './repoFilters';
import query from './query';

const app = combineReducers({
  repoFilters,
  query,
});

export default app;
