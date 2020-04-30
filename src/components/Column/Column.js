import React from 'react';
import Pixel from '../Pixel';
import './Column.css';

function Column(props) {
  let rows = [];
  for (let i = 0; i < props.height; i++) {
    rows.push(
      <Pixel
        key={i}
        data={props.data[i]}
        onChange={props.onChange}
        xValue={props.xValue}
        yValue={i}
      />
    );
  }
  return (
    <div>
      {rows}
    </div>
  )
}

export default Column;
