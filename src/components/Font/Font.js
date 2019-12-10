import React from 'react';
import Char from '../Char';
import Input from '../Input';
import Button from '../Button';
import './Font.css';

class Font extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fontWidth: 5,
			fontHeight: 7,
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

	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
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
				<Input
					type="number"
					name="fontWidth"
					label="Font Width:"
					value={this.state.fontWidth}
					min={1}
					max={16}
					onChange={this.handleInputChange.bind(this)}
				/>

				<Input
					type="number"
					name="fontHeight"
					label="Font Height:"
					value={this.state.fontHeight}
					min={1}
					max={32}
					onChange={this.handleInputChange.bind(this)}
				/>
				<div className="container">
					<Char
						width={this.state.fontWidth}
						height={this.state.fontHeight}
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
