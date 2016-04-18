import React from 'react';
import { SUPPORTED_REPOS } from '../constants';

class RepoFilterButton extends React.Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.repo);
  }

  repoUnsupported() {
    return SUPPORTED_REPOS.indexOf(this.props.repo) === -1;
  }

  render() {
    const btnClassName = this.props.selected ?
      'btn btn-default active' : 'btn btn-default';

    return (
      <button className={btnClassName}
        type="button"
        style={{ outline: 'none' }}
        onClick={this.onClick}
        disabled={this.repoUnsupported}
      >
        {this.props.repo}
      </button>
    );
  }

}

RepoFilterButton.propTypes = {
  onClick: React.PropTypes.func,
  repo: React.PropTypes.object,
  selected: React.PropTypes.bool,
};

export default RepoFilterButton;
