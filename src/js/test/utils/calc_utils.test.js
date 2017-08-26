import React from 'react';
import Calculator from '../../components/Calculator';
import * as calc_utils from '../../utils/calculator-util';

describe('calc_utils', () => {
  it('passes tests for newOperand', () => {
    let mockCalc = {
      state: {
        operation: []
      },
      setState(newState) {this.state = newState}
    };

    let testVals = (function(val, expected) {
      calc_utils.newOperand.call(this, val);
      let len = this.state.operation.length;
      expect(this.state.operation[len-1]).toEqual(expected);
    }).bind(mockCalc);

    [
      {val: '1', expected: '1'},
      {val: '5', expected: '15'},
      {val: '2', expected: '152'},
      {val: '7', expected: '1527'}
    ].forEach(function(element) {testVals(element.val, element.expected)});
  });
});
