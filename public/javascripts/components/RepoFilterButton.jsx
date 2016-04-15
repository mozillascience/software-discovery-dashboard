'use strict';

import React from 'react';
import { SUPPORTED_REPOS } from '../constants';

class RepoFilterButton extends React.Component {

  repoUnsupported (repo) {
    return SUPPORTED_REPOS.indexOf(repo) === -1;
  }

  render () {
    const btnClassName = this.props.selected ?
      'btn btn-default active' : 'btn btn-default';

    return (
      <button className={btnClassName}
              type="button"
              style={{'outline':'none'}}
              onClick={this.props.onClick}
              disabled={this.repoUnsupported(this.props.repo)}>
        {this.props.repo}
      </button>
    )
  }

}

export default RepoFilterButton;