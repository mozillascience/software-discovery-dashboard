import { combineReducers } from 'redux';
import repoFilters from './repoFilters';

const app = combineReducers({
  repoFilters,
});

export default app;
