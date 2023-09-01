import React from 'react'
import './button.scss';



export const Button = ({btnText, style}) => {
  return (
    <button style={style}>{btnText}</button>
  )
}
