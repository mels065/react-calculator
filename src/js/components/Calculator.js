import React, {Component} from 'react';
import Button from './Button';

class Calculator extends Component {
  render() {
    return (
      <div className="Calculator">
        {/*Display component will go here*/}
        <div className="button-grid">
          <div className="row">
            <Button val="AC" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="7" clickHandler={ () => {} } />
            <Button val="8" clickHandler={ () => {} } />
            <Button val="9" clickHandler={ () => {} } />
            <Button val="\u{00F7}" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="4" clickHandler={ () => {} } />
            <Button val="5" clickHandler={ () => {} } />
            <Button val="6" clickHandler={ () => {} } />
            <Button val="\u{00D7}" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="1" clickHandler={ () => {} } />
            <Button val="2" clickHandler={ () => {} } />
            <Button val="3" clickHandler={ () => {} } />
            <Button val="-" clickHandler={ () => {} } />
          </div>
          <div className="row">
            <Button val="0" clickHandler={ () => {} } />
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
