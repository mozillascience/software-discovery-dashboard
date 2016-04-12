import React from 'react';

class SearchField extends React.Component {

  render () {
    return (
      <div>
        {this.props.attribute}
        {this.props.value}
      </div>
    );
  }

}

export default SearchField;