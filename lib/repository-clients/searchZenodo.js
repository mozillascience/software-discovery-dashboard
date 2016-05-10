import searchDatacite from './searchDatacite';

export default function searchZenodo(searchFor, pageNum, rows, onComplete) {
  return searchDatacite(searchFor, 'zenodo', pageNum, rows, onComplete);
}
