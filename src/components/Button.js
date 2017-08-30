import React, {Component} from 'react';

import './stylesheets/Button.css'

class Button extends Component {
  render() {
    this.clickHandler = (event) => this.props.clickHandler(event.target.value);
    return (
      <button className="Button" value={this.props.val} onClick={this.clickHandler} >{this.props.val}</button>
    );
  }
}

export default Button;
