import React from 'react'

import "./spinner.scss";

import spinner from "./spinner.gif";


export const Spinner = ({userStyles}) => {
    const styles = userStyles && userStyles;
  return (
    <div className='spinner' style={styles}>
        <img src={spinner} alt="spinner" />
    </div>
  )
}
