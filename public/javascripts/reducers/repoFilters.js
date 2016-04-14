import { SELECT_REPO, DESELECT_REPO } from '../actions/repoFilter';

export default function repoFilter(state = {}, action) {
  // TODO temporary until querying over multiple sources is supported
  const allDeselected = {
    DataCite: false,
    GitHub: false,
    BitBucket: false,
    FigShare: false,
    Zenodo: false,
  };

  switch (action.type) {
    case SELECT_REPO:
      return Object.assign(allDeselected, { [action.repo]: true });
      //return Object.assign({}, state, { [action.repo]: true });

    case DESELECT_REPO:
      // TODO until querying over multiple sources is supported,
      // don't allow deselecting; a new source must be selected
      return state;
      //return Object.assign({}, state, { [action.repo]: false });


    default:
      return state;
  }
}
