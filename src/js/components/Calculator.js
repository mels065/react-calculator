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
      operation: []
    };
  }
  render() {
    return (
      <div className="Calculator">
        <Display display={this.state.operation} />
        <div className="button-grid">
          <div className="row">
            <Button val="AC" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="7" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="8" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="9" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val={DIVIDE_SYMBOL} clickHandler={calc_utils.newOperator.bind(this)} />
          </div>
          <div className="row">
            <Button val="4" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="5" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="6" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val={MULTIPLY_SYMBOL} clickHandler={calc_utils.newOperator.bind(this)} />
          </div>
          <div className="row">
            <Button val="1" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="2" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="3" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val={MINUS_SYMBOL} clickHandler={calc_utils.newOperator.bind(this)} />
          </div>
          <div className="row">
            <Button val="0" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val={DECIMAL_SYMBOL} clickHandler={calc_utils.newOperator.bind(this)} />
            <Button val={ADD_SYMBOL} clickHandler={calc_utils.newOperator.bind(this)} />
            <Button val={EQUAL_SYMBOL} clickHandler={ () => {} } />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;
