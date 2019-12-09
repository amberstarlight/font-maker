import React from 'react';
import Char from '../Char';
import SizeInput from '../SizeInput';
import Button from '../Button';
import './Font.css';

class Font extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 5,
			height: 7,
			pixelData: [
				[
					[0,1,1,1,1,1,0],
					[1,0,0,0,0,0,1],
					[1,0,0,0,0,0,1],
					[1,0,0,0,0,0,1],
					[0,1,1,1,1,1,0]
				],
				[
					[0,1,1,1,1,1,0],
					[1,0,0,0,0,0,1],
					[1,0,0,0,0,0,1],
					[1,0,0,0,0,0,1],
					[0,1,1,1,1,1,0]
				]
			],
			currentChar: 0
		};
	}

	handleWidthChange(event) {
		this.setState({width: event.target.value});
	}

	handleHeightChange(event) {
		this.setState({height: event.target.value});
	}

	handlePixelChange(x, y) {
		let pixelDataUpdated = this.state.pixelData;
		pixelDataUpdated[this.state.currentChar][x][y] = 1 - pixelDataUpdated[this.state.currentChar][x][y];
		this.setState({pixelData: pixelDataUpdated});
	}

	handleCharChange(button) {
		if (button === "prev" && this.state.currentChar !== 0) {
			this.setState({currentChar: this.state.currentChar - 1})
		} else {
			if ((this.state.currentChar + 1) > (this.state.pixelData.length - 1)) {
				let pixelDataUpdated = this.state.pixelData;
				pixelDataUpdated.push(
					[
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0]
					]
				);
				this.setState({pixelData: pixelDataUpdated});
			}
			this.setState({currentChar: this.state.currentChar + 1});
		}
	}

	render() {
		return (
			<div>
				<SizeInput
					name="fontWidth"
					label="Font Width:"
					value={this.state.width}
					min={1}
					max={16}
					onChange={this.handleWidthChange.bind(this)}
				/>

				<SizeInput
					name="fontHeight"
					label="Font Height:"
					value={this.state.height}
					min={1}
					max={32}
					onChange={this.handleHeightChange.bind(this)}
				/>
				<div className="container">
					<Char
						width={this.state.width}
						height={this.state.height}
						data={this.state.pixelData[this.state.currentChar]}
						onChange={this.handlePixelChange.bind(this)}
					/>
				</div>
				<Button
					name="Prev"
					type="button"
					disabled={false}
					onClick={this.handleCharChange.bind(this, "prev")}
				/>
				<Button
					name="Next"
					type="button"
					disabled={false}
					onClick={this.handleCharChange.bind(this, "next")}
				/>
			</div>
		);
	}
}

export default Font;
