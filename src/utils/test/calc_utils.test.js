import React from 'react';
import Calculator from '../../components/Calculator';
import * as calc_utils from '../../utils/calculator-util';

import {
  ADD_SYMBOL,
  MINUS_SYMBOL,
  MULTIPLY_SYMBOL,
  DIVIDE_SYMBOL,
  DECIMAL_SYMBOL,
  EQUAL_SYMBOL
} from '../../utils/constants';

describe('newOperand', () => {
  it('will be appended to last input if last input was operand', () => {
    let mockCalc = createMockCalc();

    [
      {val: '1', expected: ['1']},
      {val: '5', expected: ['15']},
      {val: '2', expected: ['152']},
      {val: '7', expected: ['1527']}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        element.val,
        element.expected,
        calc_utils.newOperand
      )
    });
  });

  it('will be pushed to end of array if last input was operator', () => {
    let mockCalc = createMockCalc();

    [
      {val: '1', expected: ['1'], cb: calc_utils.newOperand},
      {val: '+', expected: ['1', '+'], cb: calc_utils.newOperator},
      {val: '2', expected: ['1', '+', '2'], cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        element.val,
        element.expected,
        element.cb
      )
    });
  });

  it('will change a prepending 0 if it is the only number and another number is added', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '0');
    calc_utils.newOperand.call(mockCalc, '5');
    checkOperationState.call(mockCalc, ['5']);
  });

  // Note: this is because the numbers on either side of the decimal point
  // are treated differently until it is fully calculated
  it('will not overwrite a zero that follows a decimal point', () => {
    let mockCalc = createMockCalc();

    calc_utils.newDecimalPoint.call(mockCalc);
    calc_utils.newOperand.call(mockCalc, '0');
    calc_utils.newOperand.call(mockCalc, '1');
    checkOperationState.call(mockCalc, ['0', DECIMAL_SYMBOL, '01']);
  });
});

describe('newOperator', () => {
  it('will not push consecutive operators to the end of the operation', () => {
    let mockCalc = createMockCalc();

    [
      {val: '5', expected: ['5'], cb: calc_utils.newOperand},
      {val: ADD_SYMBOL, expected: ['5', ADD_SYMBOL], cb: calc_utils.newOperator},
      {val: MINUS_SYMBOL, expected: ['5', ADD_SYMBOL], cb: calc_utils.newOperator}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        element.val,
        element.expected,
        element.cb
      );
    });
  });

  it('will not add operators to the beginning of an operation', () => {
    let mockCalc = createMockCalc();

    testVals.call(mockCalc, ADD_SYMBOL, [], calc_utils.newOperator);
  });
});

describe('newDecimalPoint', () => {
  it('will add a 0 in front of decimal point operator if used at beginning', () => {
    let mockCalc = createMockCalc();

    testVals.call(mockCalc, '', ['0', '.'], calc_utils.newDecimalPoint);
  });

  it('will add 0 in front of decimal point operator if used after another operator', () => {
    let mockCalc = createMockCalc();

    [
      {val: '5', expected: ['5'], cb: calc_utils.newOperand},
      {val: MULTIPLY_SYMBOL, expected: ['5', MULTIPLY_SYMBOL], cb: calc_utils.newOperator},
      {val: '', expected: ['5', MULTIPLY_SYMBOL, '0', DECIMAL_SYMBOL], cb: calc_utils.newDecimalPoint}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        element.val,
        element.expected,
        element.cb
      );
    });
  });

  it('will not have consecutive decimal points', () => {
    let mockCalc = createMockCalc();

    [
      {expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newDecimalPoint},
      {expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newDecimalPoint}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        '',
        element.expected,
        element.cb
      );
    });
  });

  it('will not have a decimal point after number that has a decimal point before it', () => {
    let mockCalc = createMockCalc();

    [
      {val: '', expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newDecimalPoint},
      {val: '5', expected: ['0', DECIMAL_SYMBOL, '5'], cb: calc_utils.newOperand},
      {val: '', expected: ['0', DECIMAL_SYMBOL, '5'], cb: calc_utils.newDecimalPoint}
    ]
    .forEach(function(element) {
      testVals.call(
        mockCalc,
        element.val,
        element.expected,
        element.cb
      );
    });
  });
});

describe('clearAll', () => {
  it('will clear all operators and operands from operation', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '1');
    calc_utils.clearAll.call(mockCalc);
    expect(mockCalc.state.operation.length).toEqual(0);

    [
      {val: '3', cb: calc_utils.newOperand},
      {val: '', cb: calc_utils.newDecimalPoint},
      {val: '7', cb: calc_utils.newOperand},
      {val: '+', cb: calc_utils.newOperator},
      {val: '4', cb: calc_utils.newOperand}
    ]
    .forEach(function (element) { element.cb.call(mockCalc, element.val) });
    calc_utils.clearAll.call(mockCalc);
    expect(mockCalc.state.operation.length).toEqual(0);
  });

  it('will reset justCalculated boolean', () => {
    let mockCalc= createMockCalc();

    [
      {val: '2', cb: calc_utils.newOperand},
      {val: MULTIPLY_SYMBOL, cb: calc_utils.newOperator},
      {val: '3', cb: calc_utils.newOperand}
    ]
    .forEach(function (element) { element.cb.call(mockCalc, element.val) });
    calc_utils.calculate.call(mockCalc);
    calc_utils.clearAll.call(mockCalc);
    expect(mockCalc.state.justCalculated).toBe(false);
  });
});

describe('calculate', () => {
  it('adds', () => {
    let mockCalc = createMockCalc();

    [
      {val: '5', cb: calc_utils.newOperand},
      {val: ADD_SYMBOL, cb: calc_utils.newOperator},
      {val: '2', cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      element.cb.call(mockCalc, element.val);
    });
    calc_utils.calculate.call(mockCalc)
    didCalculateProperly.call(mockCalc, '7');
  });

  it('subtracts', () => {
    let mockCalc = createMockCalc();

    [
      {val: '9', cb: calc_utils.newOperand},
      {val: MINUS_SYMBOL, cb: calc_utils.newOperator},
      {val: '4', cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      element.cb.call(mockCalc, element.val);
    });
    calc_utils.calculate.call(mockCalc);
    didCalculateProperly.call(mockCalc, '5');
  });

  it('multiplies', () => {
    let mockCalc = createMockCalc();

    [
      {val: '3', cb: calc_utils.newOperand},
      {val: MULTIPLY_SYMBOL, cb: calc_utils.newOperator},
      {val: '6', cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      element.cb.call(mockCalc, element.val);
    });
    calc_utils.calculate.call(mockCalc);
    didCalculateProperly.call(mockCalc, '18');
  });

  it('divides', () => {
    let mockCalc = createMockCalc();

    [
      {val: '10', cb: calc_utils.newOperand},
      {val: DIVIDE_SYMBOL, cb: calc_utils.newOperator},
      {val: '2', cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      element.cb.call(mockCalc, element.val);
    });
    calc_utils.calculate.call(mockCalc);
    didCalculateProperly.call(mockCalc, '5');
  });

  it('can perform operations on negative numbers', () => {
    let mockCalc = createMockCalc();

    [
      {val: '-5', cb: calc_utils.newOperand},
      {val: ADD_SYMBOL, cb: calc_utils.newOperator},
      {val: '6', cb: calc_utils.newOperand}
    ]
    .forEach(function(element) {
      element.cb.call(mockCalc, element.val);
    });
    calc_utils.calculate.call(mockCalc);
    didCalculateProperly.call(mockCalc, '1');
  });

  it('will perform order of operations properly', () => {
    let mockCalc = createMockCalc();

    [
      {op1: ADD_SYMBOL, op2: MULTIPLY_SYMBOL, expected: '33'},
      {op1: MULTIPLY_SYMBOL, op2: ADD_SYMBOL, expected: '27'},
      {op1: ADD_SYMBOL, op2: MINUS_SYMBOL, expected: '2'},
      {op1: MINUS_SYMBOL, op2: ADD_SYMBOL, expected: '8'}
    ]
    .forEach(function(element) {
      calc_utils.newOperand.call(mockCalc, '5');
      calc_utils.newOperator.call(mockCalc, element.op1);
      calc_utils.newOperand.call(mockCalc, '4');
      calc_utils.newOperator.call(mockCalc, element.op2);
      calc_utils.newOperand.call(mockCalc, '7')
      calc_utils.calculate.call(mockCalc);
      didCalculateProperly.call(mockCalc, element.expected);
    });
  });

  it('will not calculate if only numbers are given', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '1');
    calc_utils.calculate.call(mockCalc);
    calc_utils.newOperand.call(mockCalc, '2');
    checkOperationState.call(mockCalc, ['12']);
  });

  it('will not calculate if only decimal numbers are given', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '1');
    calc_utils.newDecimalPoint.call(mockCalc);
    calc_utils.newOperand.call(mockCalc, '2');
    calc_utils.calculate.call(mockCalc);
    calc_utils.newOperand.call(mockCalc, '3');
    checkOperationState.call(mockCalc, ['1', '.', '23'])
  });

  it('will calculate floating point numbers', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '1.5');
    calc_utils.newOperator.call(mockCalc, MULTIPLY_SYMBOL);
    calc_utils.newOperand.call(mockCalc, '1.5');
    calc_utils.calculate.call(mockCalc);
    checkOperationState.call(mockCalc, ['2.25']);
  });

  it('will calculate to floating point numbers', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.newOperator.call(mockCalc, DIVIDE_SYMBOL);
    calc_utils.newOperand.call(mockCalc, '2');
    calc_utils.calculate.call(mockCalc);
    checkOperationState.call(mockCalc, ['2.5']);
  });

  it('makes it so a returned value will be overwritten when an operand is entered', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.newOperator.call(mockCalc, ADD_SYMBOL);
    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.calculate.call(mockCalc);
    calc_utils.newOperand.call(mockCalc, '3');
    checkOperationState.call(mockCalc, ['3']);
  });

  it('makes it so returned value will be used if an operator is provided', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.newOperator.call(mockCalc, ADD_SYMBOL);
    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.calculate.call(mockCalc);
    calc_utils.newOperator.call(mockCalc, ADD_SYMBOL);
    checkOperationState.call(mockCalc, ['10', '+']);
  });

  it('makes it so a return value will be overwritten if a decimal point is entered', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.newOperator.call(mockCalc, ADD_SYMBOL);
    calc_utils.newOperand.call(mockCalc, '5');
    calc_utils.calculate.call(mockCalc);
    calc_utils.newDecimalPoint.call(mockCalc);
    checkOperationState.call(mockCalc, ['0', DECIMAL_SYMBOL]);
  });

  it('will not compute an incomplete operation', () => {
    let mockCalc = createMockCalc();

    calc_utils.newOperand.call(mockCalc, '7');
    calc_utils.newOperator.call(mockCalc, MINUS_SYMBOL);
    calc_utils.calculate.call(mockCalc);
    checkOperationState.call(mockCalc, ['7', MINUS_SYMBOL]);
  });
});

/*HELPER FUNCTIONS*/
function createMockCalc() {
  return {
    state: {
      operation: [],
      justCalculated: false
    },
    setState(newState) {this.state = Object.setPrototypeOf(newState, this.state)}
  };
}

function testVals(val, expected, cb) {
  cb.call(this, val);
  let len = this.state.operation.length;
  checkOperationState.call(this, expected);
}

function checkOperationState(expected) {
  expect(this.state.operation.every((elem, i) => elem === expected[i]))
    .toBe(true);
}

function didCalculateProperly(expected) {
  expect(this.state.operation.length).toEqual(1);
  expect(this.state.operation[0]).toEqual(expected);
}
