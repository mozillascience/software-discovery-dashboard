import React from 'react';

function App({children}) {
  return (
    <div>{children}</div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
