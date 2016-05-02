import React from 'react';
import { ATTRIBUTES, ATTRIBUTES_DISPLAY } from '../constants';

class SearchField extends React.Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this._onTextInput = this._onTextInput.bind(this);
    this.removeField = this.removeField.bind(this);
    this.addField = this.addField.bind(this);
  }

  componentWillMount() {
    this.state = {
      selectedAttribute: this.props.attribute,
    };
  }

  _onChange(e) {
    this.props.removeField(this.state.selectedAttribute);
    this.props.addField(e.target.value);
    this.setState({ selectedAttribute: e.target.value });
  }

  _onTextInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.search();
    }
  }

  value() {
    return this.refs.searchInput.value;
  }

  removeField() {
    this.props.removeField(this.state.selectedAttribute);
  }

  addField() {
    this.props.addField(null);
  }

  render() {
    return (
      <div>
        <div className="select-borderless">
          <select
            className="attribute-select"
            value={this.state.selectedAttribute}
            onChange={this._onChange}
          >
            {ATTRIBUTES.map(k =>
              <option key={k} value={k}>{ATTRIBUTES_DISPLAY[k]}</option>
            )}
          </select>
          <i className="fa fa-caret-down"></i>
        </div>

        <input
          type="text"
          className="search-field"
          ref="searchInput"
          onKeyDown={this._onTextInput}
          defaultValue={this.props.value}
        ></input>

        {this.props.withDelete ?
          <button
            className="pure-button remove-button"
            onClick={this.removeField}
          >-</button> : ''}

        <button
          className="pure-button add-button"
          onClick={this.addField}
        >+</button>
      </div>
    );
  }

}

SearchField.propTypes = {
  attribute: React.PropTypes.string,
  value: React.PropTypes.string,
  removeField: React.PropTypes.func,
  addField: React.PropTypes.func,
  search: React.PropTypes.func,
  withDelete: React.PropTypes.bool,
};

export default SearchField;
