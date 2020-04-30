import React from 'react';
import './Pixel.css';

function Pixel(props) {
  return (
    <div className="pixel">
      <input
        type="checkbox"
        checked={props.data}
        onChange={() => props.onChange(props.xValue, props.yValue)}
      />
      <span className="checkbox-pixel"></span>
    </div>
  );
}

export default Pixel;
