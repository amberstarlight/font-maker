import React from 'react';
import Pixel from '../Pixel';
import './Column.css';

class Column extends React.Component {

	render() {
		let rows = [];
		for (var i = 0; i < this.props.height; i++) {
			rows.push(
				<Pixel
					key={i}
					data={this.props.data[i]}
					onChange={this.props.onChange}
					xValue={this.props.xValue}
					yValue={i}
				/>
			);
		}

		return (
			<div>
			{rows}
			</div>
		);
	}
}

export default Column;
