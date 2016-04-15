import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions/query';
import { performQuery } from '../actions/results';

function mapStateToProps(state) {
  return {
    repo: state.repoFilters,
    query: state.query,
  };
}

class Pagination extends React.Component {

  constructor() {
    super();

    this.set = this.set.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  set(page) {
    this.props.dispatch(changePage(page));
  }

  decrement() {
    if (this.props.query.page > 1) {
      this.set(this.props.query.page - 1);
    }
  }

  increment() {
    this.set(this.props.query.page + 1);
  }

  render() {
    const pages = [];
    for (var i = 1; i <= 10; i++) {
      const classes = 'page-number ' + (this.props.query.page === i ?
        'selected-page' : '');
      pages.push(<label onClick={this.set.bind(this, i)}
                        className={classes} key={i}>{i}</label>);
    }

    return (
      <div className="results-pagination">
        <a onClick={this.decrement}><i className="fa fa-caret-left"></i></a>
        {pages}
        <a onClick={this.increment}><i className="fa fa-caret-right"></i></a>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Pagination);
