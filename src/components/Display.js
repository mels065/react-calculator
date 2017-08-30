import React, {Component} from 'react';

import './stylesheets/Display.css'

class Display extends Component {
  render() {
    return (
      <div className="Display">{this.props.display}</div>
    );
  }
}

export default Display;
