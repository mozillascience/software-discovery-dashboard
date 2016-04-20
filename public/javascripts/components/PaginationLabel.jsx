import React from 'react';

class PaginationLabel extends React.Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.number);
  }

  render() {
    return (
      <label className={this.props.classes} onClick={this.onClick}>
        {this.props.number}
      </label>
    );
  }

}

PaginationLabel.propTypes = {
  number: React.PropTypes.number,
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default PaginationLabel;
