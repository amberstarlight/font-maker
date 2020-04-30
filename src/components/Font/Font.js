import React, { useState } from 'react';
import Char from '../Char';
import Input from '../Input';
import Button from '../Button';
import './Font.css';

function Font() {
  const [fontData, setFontData] = useState({
    width: 5,
    height: 7,
    currentChar: 0,
    pixelData: [
      [
        [0,1,1,1,1,1,0],
        [1,0,0,0,1,0,1],
        [1,0,0,1,0,0,1],
        [1,0,1,0,0,0,1],
        [0,1,1,1,1,1,0]
      ],
      [
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0]
      ]
    ]
  });

  const updateFontData = (newData) => {
    setFontData(currentState => {
      return {
        ...currentState,
        ...newData
      }
    })
  }

  const handleSizeChange = (newWidth, newHeight) => {
    let pixelDataUpdated = fontData.pixelData.slice();
    if (newHeight !== fontData.height) {
      for (let i = 0; i < pixelDataUpdated.length; i++) {
        let currentChar = pixelDataUpdated[i];
        for (let x = 0; x < currentChar.length; x++) {
          let currentCol = currentChar[x];
          while (currentCol.length > newHeight) {
            currentCol.pop();
          }
          while (currentCol.length < newHeight) {
            currentCol.push(0);
          }
        }
      }

      updateFontData({
        height: newHeight,
        pixelData: pixelDataUpdated
      });
    }

    if (newWidth !== fontData.width) {
      for (let i = 0; i < pixelDataUpdated.length; i++) {
        let currentChar = pixelDataUpdated[i];
        while (currentChar.length > newWidth) {
          currentChar.pop();
        }
        while (currentChar.length < newWidth) {
          let newArray = new Array(newHeight).fill(0);
          currentChar.push(newArray);
        }
      }

      updateFontData({
        width: newWidth,
        pixelData: pixelDataUpdated
      });
    }
  }

  const handleCharInput = (value) => {
    if (value === undefined || null) {
      setFontData((currentState) => {
        return {
          ...currentState,
          currentChar: 0
        }
      })
    } else {
      let lengthToMatch = fontData.pixelData.length
      for(let i = value; i <= lengthToMatch; i++){
        addChar();
      }

      updateFontData({
        currentChar: value
      });
    }
  }

  const addChar = () => {
    let pixelDataUpdated = fontData.pixelData.slice();
    let newChar = [];
    for (let x = 0; x < fontData.width; x++) {
      let column = new Array(fontData.height).fill(0);
      newChar.push(column);
    }
    pixelDataUpdated.push(newChar);
    updateFontData({
      pixelData: pixelDataUpdated
    });
  };

  const handlePixelChange = (x, y) => {
    let pixelDataUpdated = fontData.pixelData.slice();
    pixelDataUpdated[fontData.currentChar][x][y] = 1 - pixelDataUpdated[fontData.currentChar][x][y];
    updateFontData({
      pixelData: pixelDataUpdated
    })
  }

  return (
    <div>
      <Input
        type="number"
        name="fontWidth"
        label="Font Width:"
        value={fontData.width}
        min={1}
        max={16}
        onChange={(event) => handleSizeChange(event.target.value, fontData.height)}
      />
      <Input
        type="number"
        name="fontHeight"
        label="Font Height:"
        value={fontData.height}
        min={1}
        max={32}
        onChange={(event) => handleSizeChange(fontData.width, event.target.value)}
      />
      <div className="container">
        <Char
          width={fontData.width}
          height={fontData.height}
          data={fontData.pixelData[fontData.currentChar]}
          onChange={handlePixelChange}
        />
        <div className="small">
          <Char
            width={fontData.width}
            height={fontData.height}
            data={fontData.pixelData[fontData.currentChar]}
            onChange={handlePixelChange}
          />
        </div>
      </div>
      <Button
        text="Previous"
        name="Prev"
        type="button"
        disabled={fontData.currentChar <= 0}
        onClick={() => handleCharInput(fontData.currentChar - 1)}
      />
      <Input
        type="number"
        name="currentChar"
        label="Character:"
        value={fontData.currentChar}
        min={0}
        onChange={(event) => handleCharInput(event.target.value)}
      />
      <Button
        text="Next"
        name="Next"
        type="button"
        disabled={false}
        onClick={() => handleCharInput(fontData.currentChar + 1)}
      />
    </div>
  );
}

export default Font;
