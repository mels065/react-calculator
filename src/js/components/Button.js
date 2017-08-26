import React, {Component} from 'react';

class Button extends Component {
  render() {
    this.clickHandler = (event) => this.props.clickHandler(event.target.value);
    return (
      <button value={this.props.val} onClick={this.clickHandler} >{this.props.val}</button>
    );
  }
}

export default Button;
