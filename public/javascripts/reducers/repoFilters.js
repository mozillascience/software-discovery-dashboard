import { SELECT_REPO, DESELECT_REPO } from '../actions/repoFilter';

export default function repoFilter(state = {}, action) {
  switch (action.type) {
    case SELECT_REPO:
      return Object.assign({}, state, { [action.repo]: true });

    case DESELECT_REPO:
      return Object.assign({}, state, { [action.repo]: false });

    default:
      return state;
  }
}
