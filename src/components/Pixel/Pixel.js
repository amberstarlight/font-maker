import React from 'react';
import './Pixel.css';

class Pixel extends React.Component {

	render() {
		return (
			<div className="pixel">
				<input
					type="checkbox"
					checked={this.props.data}
					onChange={() => this.props.onChange(this.props.xValue, this.props.yValue)}/>
				<span className="checkbox-pixel"></span>
			</div>
		);
	}

}

export default Pixel;
