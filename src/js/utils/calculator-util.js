function newOperand(val) {
  let len = this.state.operation.length;
  // Use coercion to see if the last operation value is a number
  if (this.state.operation[len-1] >= 0) this.setState({
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

export {newOperand};
