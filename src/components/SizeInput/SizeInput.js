import React from 'react';
import './SizeInput.css';

class SizeInput extends React.Component {
	
	render() {
		return (
			<div>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<input
					type="number"
					min={this.props.min}
					max={this.props.max}
					id={this.props.name}
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}

export default SizeInput;
