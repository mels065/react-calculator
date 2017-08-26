import {DECIMAL_SYMBOL} from './constants';

function newOperand(val) {
  let len = this.state.operation.length;
  // Use coercion to see if the last operation value is a number
  if (isValidInput.call(this, val)) this.setState({
    operation: [
      ...(this.state.operation.slice(0, len-1)),
      `${this.state.operation[len-1]}${val}`
    ]
  });
  else this.setState({
    operation: [
      ...this.state.operation,
      val
    ]
  });
}

function newOperator(val) {
  if (isValidDecimalPoint.call(this, val)) {
    if (lastInputIsOperator.call(this)) this.setState({
      operation: [
        ...this.state.operation,
        '0',
        val
      ]
    })
    else this.setState({
      operation: [
        ...this.state.operation,
        val
      ]
    });
  }
  if (isValidInput.call(this, val)) this.setState({
    operation: [
      ...this.state.operation,
      val
    ]
  });
}

function isValidInput(val) {
  let len = this.state.operation.length;
  // decimal rules are handled in another function
  return val !== DECIMAL_SYMBOL && this.state.operation[len-1] >= 0
}

function lastInputIsOperator() {
  // is operator or empty array?
  // empty array will result in -1 index, resulting in undefined
  let len = this.state.operation.length;
  return !(this.state.operation[len-1] >= 0)
}

function isValidDecimalPoint(val) {
  let len = this.state.operation.length;
  return (val === DECIMAL_SYMBOL &&
          this.state.operation[len-1] !== DECIMAL_SYMBOL &&
          this.state.operation[len-2] !== DECIMAL_SYMBOL);
}

export {newOperand, newOperator};
