import React from 'react';
import Column from '../Column';
import './Char.css';

class Char extends React.Component {

  render() {
    let columns = [];
    for (let i = 0; i < this.props.width; i++) {
      columns.push(
        <Column
          key={i}
          height={this.props.height}
          data={this.props.data[i]}
          onChange={this.props.onChange}
          xValue={i}
        />
      );
    }

    return (
      <div className="char">
        {columns}
      </div>
    );
  }
}

export default Char;
