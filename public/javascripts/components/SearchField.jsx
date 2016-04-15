import React from 'react';
import { ATTRIBUTES, ATTRIBUTES_DISPLAY } from '../constants';

class SearchField extends React.Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    this.state = {
      selectedAttribute: this.props.attribute,
    };
  }

  _onChange(e) {
    this.props.removeField(this.state.selectedAttribute);
    this.props.addField(e.target.value);
    this.setState({selectedAttribute: e.target.value});
  }

  value() {
    return this.refs.searchInput.value;
  }

  // TODO this function and the interactions it performs are quite ugly,
  // could do with a good kneading
  render() {
    return (
      <div>
        <div className="select-borderless">
          <select className="attribute-select"
              value={this.state.selectedAttribute}
              onChange={this._onChange}>
            {ATTRIBUTES.map(k => {
              return <option key={k} value={k}>{ATTRIBUTES_DISPLAY[k]}</option>
            })}
          </select><i className="fa fa-caret-down"></i>
        </div>
        <input type="text" className="search-field" ref="searchInput"></input>
        {this.props.withDelete ?
          <button className="pure-button remove-button"
            onClick={
              this.props.removeField.bind(this, this.state.selectedAttribute)
            }>-</button> : ''}
        <button className="pure-button add-button"
                onClick={this.props.addField.bind(this, null)}>+</button>
        
      </div>
    );
  }

}

export default SearchField;
