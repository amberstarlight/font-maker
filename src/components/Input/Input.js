import React from 'react';
import './Input.css';

function Input(props) {
  return (
    <>
      <label>
        {props.label}
        <input {...props} onChange={props.onChange}/>
      </label>
    </>
  )
}

export default Input;
