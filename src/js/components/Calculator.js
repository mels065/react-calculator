import React, {Component} from 'react';
import Display from './Display';
import Button from './Button';
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
            <Button val="\u{00F7}" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="4" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="5" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="6" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="\u{00D7}" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="1" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="2" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="3" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="-" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="0" clickHandler={calc_utils.newOperand.bind(this)} />
            <Button val="." clickHandler={ () => {} } />
            <Button val="+" clickHandler={ () => {} } />
            <Button val="=" clickHandler={ () => {} } />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;
