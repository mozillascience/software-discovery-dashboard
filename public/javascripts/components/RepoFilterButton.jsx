'use strict';

import React from 'react';

class RepoFilterButton extends React.Component {

  render () {
    const btnClassName = this.props.selected ?
      'btn btn-default active' : 'btn btn-default';

    return (
      <button className={btnClassName}
              type="button"
              style={{'outline':'none'}}
              onClick={this.props.onClick}>
        {this.props.repo}
      </button>
    )
  }

}

export default RepoFilterButton;