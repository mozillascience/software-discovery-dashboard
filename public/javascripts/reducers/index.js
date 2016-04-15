import { combineReducers } from 'redux';
import repoFilters from './repoFilters';
import query from './query';
import results from './results';

const app = combineReducers({
  repoFilters,
  query,
  results,
});

export default app;
