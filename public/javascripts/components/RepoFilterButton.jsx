'use strict';

import React from 'react';
import { SUPPORTED_REPOS } from '../constants';

class RepoFilterButton extends React.Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  repoUnsupported(repo) {
    return SUPPORTED_REPOS.indexOf(repo) === -1;
  }

  onClick() {
    this.props.onClick(this.props.repo);
  }

  render() {
    const btnClassName = this.props.selected ?
      'btn btn-default active' : 'btn btn-default';

    return (
      <button className={btnClassName}
        type="button"
        style={{'outline':'none'}}
        onClick={this.onClick}
        disabled={this.repoUnsupported(this.props.repo)}
      >
        {this.props.repo}
      </button>
    )
  }

}

export default RepoFilterButton;