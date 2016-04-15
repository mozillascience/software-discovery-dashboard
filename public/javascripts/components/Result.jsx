import React from 'react';
import moment from 'moment';
import { DATE_ATTR_DISPLAY } from '../constants';

class Result extends React.Component {
  
  getDateString(result) {
    let dateString = '';

    ['dateModified','dateCreated','datePublished'].forEach(d => {
      if (result[d] && result[d].length > 4) {
        let attr = DATE_ATTR_DISPLAY[d] + ': ';
        dateString = attr + moment(result[d]).format('MMM Do, YYYY');
      }
    });

    return dateString || 'Unknown date';
  }

  render() {
    const result = this.props.result;

    const dateString = this.getDateString(result);
    const source = result.source ?
      <a src={result.source}>{result.source}</a> : '';
    const description = result.description ?
      <p>{result.description}</p> : '';
    const keywords = result.keywords ?
      <ul className="keywords-list">
        {result.keywords.map(k => {
          return <li className="keyword" key={k}>{k}</li>
        })}
      </ul> : '';

    return (
      <li>
        <div className="result">
          <h1>{result.title}</h1>
          <span>{dateString}</span>
          {source}
          {description}
          {keywords}
        </div>
      </li>
    );
  }

}

export default Result;
