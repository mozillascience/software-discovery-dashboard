export const SELECT_REPO = 'SELECT_REPO';
export const DESELECT_REPO = 'DESELECT_REPO';

function toggleRepo(repo, actionType) {
  return {
    type: actionType,
    repo,
  };
}

export function selectRepo(repo) {
  return dispatch => dispatch(toggleRepo(repo, SELECT_REPO));
}

export function deselectRepo(repo) {
  return dispatch => dispatch(toggleRepo(repo, DESELECT_REPO));
}
