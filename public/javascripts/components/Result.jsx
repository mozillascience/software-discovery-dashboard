import React from 'react';
import moment from 'moment';

class Result extends React.Component {
  
  render() {
    const result = this.props.result;

    const datePublished = result.datePublished ?
      <span>{moment(result.datePublished).format('MMMM Do YYYY')}</span> : '';
    const source = result.source ?
      <a src={result.source}>{result.source}</a> : '';
    const description = result.description ?
      <p>{result.description}</p> : '';
    const keywords = result.keywords ?
      <ul className="keywords-list">
        {result.keywords.map(k => {
          return <li key={k}>{k}</li>
        })}
      </ul> : '';

    return (
      <li>
        <div className="result">
          <h1>{result.title}</h1>
          {datePublished}
          {source}
          {description}
          {keywords}
        </div>
      </li>
    );
  }

}

export default Result;
