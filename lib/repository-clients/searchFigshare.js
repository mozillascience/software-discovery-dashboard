import searchDatacite from './searchDatacite';

export default function searchFigshare(searchFor, pageNum, rows, onComplete) {
  return searchDatacite(searchFor, 'figshare', pageNum, rows, onComplete);
}
