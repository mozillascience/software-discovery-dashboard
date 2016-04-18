import React from 'react';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="la-ball-atom la-2x">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default LoadingSpinner;