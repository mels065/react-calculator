import React from 'react'

import './stylesheets/Button.css'

const Button = props => {
  const clickHandler = event => props.clickHandler(event.target.value)

  return (
    <button className='Button' value={props.val} onClick={clickHandler}>
      {props.val}
    </button>
  )
}

export default Button
