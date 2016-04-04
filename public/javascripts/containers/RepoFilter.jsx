'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { selectRepo, deselectRepo } from '../actions/repoFilter';
import RepoFilterButton from '../components/RepoFilterButton';

function mapStateToProps(state) {
  return {
    filters : state.repoFilters
  }
}

class RepoFilter extends React.Component {

  constructor () {
    super();

    this.toggleRepo = this.toggleRepo.bind(this);
  }

  toggleRepo (repo) {
    if (this.props.filters[repo])
      this.props.dispatch(deselectRepo(repo));
    else
      this.props.dispatch(selectRepo(repo));
  }

  render () {
    const filterButtons = Object.keys(this.props.filters).map(f => {
      return <RepoFilterButton
                key={f}
                repo={f}
                selected={this.props.filters[f]}
                onClick={this.toggleRepo.bind(this, f)}/>
    });

    return (
      <div className="btn-group repository-selection">
        {filterButtons}
      </div>
    )
  }

}

export default connect(mapStateToProps)(RepoFilter);