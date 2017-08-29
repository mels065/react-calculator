import React, { Component } from 'react';
import './stylesheets/components/App.css';

import Calculator from './Calculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
