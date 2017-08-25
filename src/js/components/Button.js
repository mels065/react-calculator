import React, {Component} from 'react';

class Button extends Component {
  clickHandler(event) {
    this.props.clickHandler(event.target.value);
  }
  render() {
    return (
      <button value={this.props.val} onClick={this.clickHandler} >{this.props.val}</button>
    );
  }
}

export default Button;
