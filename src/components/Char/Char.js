import React from 'react';
import Column from '../Column';
import './Char.css';

function Char(props) {
  let columns = [];
  for (let i = 0; i < props.width; i++) {
    columns.push(
      <Column
        key={i}
        height={props.height}
        data={props.data[i]}
        onChange={props.onChange}
        xValue={i}
      />
    );
  }

  return (
    <div className="char">
      {columns}
    </div>
  )
}

export default Char;
