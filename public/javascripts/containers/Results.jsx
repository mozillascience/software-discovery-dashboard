import React from 'react';
import { connect } from 'react-redux';
import Result from '../components/Result';
import Pagination from './Pagination';
import { findKey } from '../util/objectUtils';
import { normalizeCommaSeparated } from '../util/stringUtils';
import { performQuery } from '../actions/results';

function mapStateToProps(state) {
  return {
    repo: state.repoFilters,
    query: state.query,
    results: state.results,
  };
}

class Results extends React.Component {

  componentWillMount() {
    // TODO this will change when querying multiple sources is supported
    const repo = findKey(this.props.repo, true);
    this.props.dispatch(performQuery(repo, this.props.query));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query.page !== this.props.query.page) {
      const repo = findKey(newProps.repo, true);
      this.props.dispatch(performQuery(repo, newProps.query));
    }
  }

  render() {
    // TODO this will change when querying multiple sources is supported
    const sources = `sources:${findKey(this.props.repo, true)}`;
    const fields = Object.keys(this.props.query.fields).map(a =>
      `${a}:${normalizeCommaSeparated(this.props.query.fields[a])}`
    ).join(' ');
    const queryInputString = `${sources} ${fields}`;

    return (
      <div className="results-container">
        <form className="pure-form results-query-summary">
          <fieldset>
            <input type="text"
              className="results-query-input"
              defaultValue={queryInputString}
              ref="results-query-input"
            />
          </fieldset>
        </form>
        <div className="results">
          <ul className="results-list">
            {this.props.results.articles ? this.props.results.articles.map(r =>
              <Result
                result={r}
                key={r.id || r.identifier.replace('/', '')}
              />
            ) : <div>No Results to Display</div>}
            <li>
              <Pagination />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  repo: React.PropTypes.object,
  query: React.PropTypes.object,
  results: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(Results);
