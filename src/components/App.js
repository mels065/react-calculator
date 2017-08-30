import React, { Component } from 'react';
import './stylesheets/App.css';

import Calculator from './Calculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />
        <footer>
          <div className="copyright">Brandon Mellus &copy; (2017)</div>
        </footer>
      </div>
    );
  }
}

export default App;
