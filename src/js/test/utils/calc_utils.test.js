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

  it('will add a 0 in front of decimal point operator if used at beginning', () => {
    let mockCalc = createMockCalc();

    testVals.call(mockCalc, DECIMAL_SYMBOL, ['0', '.'], calc_utils.newOperator);
  });

  it('will add 0 in front of decimal point operator if used after another operator', () => {
    let mockCalc = createMockCalc();

    [
      {val: '5', expected: ['5'], cb: calc_utils.newOperand},
      {val: MULTIPLY_SYMBOL, expected: ['5', MULTIPLY_SYMBOL], cb: calc_utils.newOperator},
      {val: DECIMAL_SYMBOL, expected: ['5', MULTIPLY_SYMBOL, '0', DECIMAL_SYMBOL], cb: calc_utils.newOperator}
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
      {val: DECIMAL_SYMBOL, expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newOperator},
      {val: DECIMAL_SYMBOL, expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newOperator}
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

  it('will not have a decimal point after number that has a decimal point before it', () => {
    let mockCalc = createMockCalc();

    [
      {val: DECIMAL_SYMBOL, expected: ['0', DECIMAL_SYMBOL], cb: calc_utils.newOperator},
      {val: '5', expected: ['0', DECIMAL_SYMBOL, '5'], cb: calc_utils.newOperand},
      {val: DECIMAL_SYMBOL, expected: ['0', DECIMAL_SYMBOL, '5'], cb: calc_utils.newOperator}
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
      {val: '.', cb: calc_utils.newOperator},
      {val: '7', cb: calc_utils.newOperand},
      {val: '+', cb: calc_utils.newOperator},
      {val: '4', cb: calc_utils.newOperand}
    ]
    .forEach(function (element) { element.cb.call(mockCalc, element.val) });
    calc_utils.clearAll.call(mockCalc);
    expect(mockCalc.state.operation.length).toEqual(0);
  });
});

function createMockCalc() {
  return {
    state: {
      operation: []
    },
    setState(newState) {this.state = newState}
  };
}

function testVals(val, expected, cb) {
  cb.call(this, val);
  let len = this.state.operation.length;
  expect(this.state.operation.every((elem, i) => elem === expected[i]))
    .toBe(true);
}
