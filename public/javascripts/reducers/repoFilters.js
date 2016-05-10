import { SELECT_REPO, DESELECT_REPO } from '../actions/repoFilter';
import { findAllKeys } from '../util/objectUtils';

export default function repoFilter(state = {}, action) {
  switch (action.type) {
    case SELECT_REPO:
      return Object.assign({}, state, { [action.repo]: true });

    case DESELECT_REPO:
      if (findAllKeys(state, true).length === 1) {
        return state;
      }
      return Object.assign({}, state, { [action.repo]: false });

    default:
      return state;
  }
}
