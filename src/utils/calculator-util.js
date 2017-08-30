import {
  ADD_SYMBOL,
  MINUS_SYMBOL,
  MULTIPLY_SYMBOL,
  DIVIDE_SYMBOL,
  DECIMAL_SYMBOL,
  ORDER_OF_OPERATIONS,
  CALC_OPER
} from './constants';

function newOperand(val) {
  let len = this.state.operation.length;

  if (this.state.justCalculated) this.setState({
    operation: [val],
    justCalculated: false
  });
  else if (lastInputIsZero.call(this)) this.setState({
    operation: [
      ...(this.state.operation.slice(0, len-1)),
      val
    ]
  });
  // Use coercion to see if the last operation value is a number
  else if (isValidInput.call(this, val)) this.setState({
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

function newDecimalPoint() {
  if (this.state.justCalculated) this.setState({
    operation: ['0', DECIMAL_SYMBOL],
    justCalculated: false
  });
  else if (isValidDecimalPoint.call(this)) {
    if (lastInputIsOperator.call(this)) this.setState({
      operation: [
        ...this.state.operation,
        '0',
        DECIMAL_SYMBOL
      ],
      justCalculated: false
    })
    else this.setState({
      operation: [
        ...this.state.operation,
        DECIMAL_SYMBOL
      ],
      justCalculated: false
    });
  }
}

function newOperator(val) {
  if (isValidInput.call(this, val)) this.setState({
    operation: [
      ...this.state.operation,
      val
    ],
    justCalculated: false
  });
}

function clearAll() {
  this.setState({
    operation: [],
    justCalculated: false
  });
}

function calculate() {
  // Don't do calculations on an an incomplete operation
  if (lastInputIsOperator.call(this) || !anyOperators.call(this)) return;

  let currentOperation = [...this.state.operation];
  currentOperation = connectDecimalNumbers(currentOperation);
  currentOperation = ORDER_OF_OPERATIONS.reduce((curOp, ops) => operatorCalculation(curOp, ops), currentOperation);

  this.setState({
    operation: currentOperation,
    justCalculated: true
  });
}

export {newOperand, newDecimalPoint, newOperator, clearAll, calculate};


/*PRIVATE FUNCTIONS*/
function isValidInput(val) {
  let len = this.state.operation.length;
  // decimal rules are handled in another function
  return val !== DECIMAL_SYMBOL && Math.abs(this.state.operation[len-1]) >= 0
}

function lastInputIsOperator() {
  // is operator or empty array?
  // empty array will result in -1 index, resulting in undefined
  let len = this.state.operation.length;
  return !(Math.abs(this.state.operation[len-1]) >= 0)
}

function lastInputIsZero() {
  let len = this.state.operation.length;
  return this.state.operation[len-1] === '0' &&
    this.state.operation[len-2] !== DECIMAL_SYMBOL;
}

function isValidDecimalPoint() {
  let len = this.state.operation.length;
  return (this.state.operation[len-1] !== DECIMAL_SYMBOL &&
          this.state.operation[len-2] !== DECIMAL_SYMBOL);
}

function anyOperators() {
  return [MULTIPLY_SYMBOL, DIVIDE_SYMBOL, ADD_SYMBOL, MINUS_SYMBOL].some(
    // Bitwise NOT (~) will make -1 into a 0, thus making it falsey
    // Double negation to coerce appropriate boolean
    (op) => !!~this.state.operation.indexOf(op)
  )
}

function findNextOperator(currentOperation, ops) {
  for (let i = 1; i < currentOperation.length; i+=2) {
    // Bitwise NOT (~) will make -1 into a 0, thus making it falsey
    if (~ops.indexOf(currentOperation[i])) return [i, currentOperation[i]]
  }
  return [-1, null];
}

function connectDecimalNumbers(currentOperation) {
  currentOperation = [...currentOperation];

  let result = findNextOperator(currentOperation, [DECIMAL_SYMBOL]);
  // Bitwise NOT (~) will make -1 into a 0, thus making it falsey
  while( ~result[0] ) {
    let [i] = result;
    let newVal = `${currentOperation[i-1]}${DECIMAL_SYMBOL}${currentOperation[i+1]}`;
    currentOperation = [...(currentOperation.slice(0, i-1)), newVal, ...(currentOperation.slice(i+2))];

    result = findNextOperator(currentOperation, [DECIMAL_SYMBOL]);
  }

  return currentOperation;
}

function operatorCalculation(currentOperation, ops) {
  currentOperation = [...currentOperation];

  let result = findNextOperator(currentOperation, ops);
  // Bitwise NOT (~) will make -1 into a 0, thus making it falsey
  while ( ~result[0] ) {
    let [i, op] = result;
    let newVal = `${CALC_OPER[op](currentOperation[i-1], currentOperation[i+1])}`;
    currentOperation = [...(currentOperation.slice(0, i-1)), newVal, ...(currentOperation.slice(i+2))];

    result = findNextOperator(currentOperation, ops);
  }

  return currentOperation;
}
