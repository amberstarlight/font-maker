import React from 'react';
import './Button.css';

class Button extends React.Component {

	render() {
		return (
			<button
				className="button"
				type={this.props.type}
				disabled={this.props.disabled}
				onClick={this.props.onClick}
			>
				{this.props.name}
			</button>
		);
	}

}

export default Button;
