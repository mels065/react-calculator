import React, {Component} from 'react';
import Display from './Display';
import Button from './Button';
import {
  ADD_SYMBOL,
  MINUS_SYMBOL,
  MULTIPLY_SYMBOL,
  DIVIDE_SYMBOL,
  DECIMAL_SYMBOL,
  EQUAL_SYMBOL
} from '../utils/constants';
import * as calc_utils from '../utils/calculator-util';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operation: [],
      justCalculated: false
    };
  }
  render() {
    let newOperand      = calc_utils.newOperand.bind(this),
        newOperator     = calc_utils.newOperator.bind(this),
        newDecimalPoint = calc_utils.newDecimalPoint.bind(this),
        clearAll        = calc_utils.clearAll.bind(this),
        calculate       = calc_utils.calculate.bind(this);

    return (
      <div className="Calculator">
        <Display display={this.state.operation} />
        <div className="button-grid">
          <div className="row">
            <Button val="AC" clickHandler={clearAll} />
          </div>
          <div className="row">
            <Button val="7" clickHandler={newOperand} />
            <Button val="8" clickHandler={newOperand} />
            <Button val="9" clickHandler={newOperand} />
            <Button val={DIVIDE_SYMBOL} clickHandler={newOperator} />
          </div>
          <div className="row">
            <Button val="4" clickHandler={newOperand} />
            <Button val="5" clickHandler={newOperand} />
            <Button val="6" clickHandler={newOperand} />
            <Button val={MULTIPLY_SYMBOL} clickHandler={newOperator} />
          </div>
          <div className="row">
            <Button val="1" clickHandler={newOperand} />
            <Button val="2" clickHandler={newOperand} />
            <Button val="3" clickHandler={newOperand} />
            <Button val={MINUS_SYMBOL} clickHandler={newOperator} />
          </div>
          <div className="row">
            <Button val="0" clickHandler={newOperand} />
            <Button val={DECIMAL_SYMBOL} clickHandler={newDecimalPoint} />
            <Button val={ADD_SYMBOL} clickHandler={newOperator} />
            <Button val={EQUAL_SYMBOL} clickHandler={calculate} />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;
