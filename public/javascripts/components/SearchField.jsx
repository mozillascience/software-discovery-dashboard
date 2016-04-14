import React from 'react';

const ATTRIBUTES = {
  author: 'Author',
  id: 'Identifier',
  datePublished: 'Date Published',
  dateModified: 'Date Modified',
  dateCreated: 'Date Created',
  description: 'Description',
  keywords: 'Keywords',
  license: 'License',
  title: 'Title',
  version: 'Version',
};

class SearchField extends React.Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    this.state = {
      selectedAttribute: this.props.attribute || 'author',
    };
  }

  _onChange(e) {
    this.setState({selectedAttribute: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="select-borderless">
          <select className="attribute-select"
              value={this.state.selectedAttribute}
              onChange={this._onChange}>
            {Object.keys(ATTRIBUTES).map(k => {
              return <option key={k} value={k}>{ATTRIBUTES[k]}</option>
            })}
          </select><i className="fa fa-caret-down"></i>
        </div>
        <input type="text" className="search-field" ref="search-input"></input>
        <button className="pure-button add-button"
                onClick={this.props.addField}>+</button>
        {this.props.withDelete ?
          <button className="pure-button remove-button">-</button> : ''}
      </div>
    );
  }

}

export default SearchField;