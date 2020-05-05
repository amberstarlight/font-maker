import React, { useState } from 'react';
import Char from '../Char';
import Input from '../Input';
import Button from '../Button';
import './Font.css';
import licence from '../../util/template.js';

const padder = (input, desiredLength) => {
  let mutatedInput = input;
  for (let i = input.length; i < desiredLength; i++) {
    mutatedInput = `0${mutatedInput}`;
  }
  return mutatedInput;
}

const fontToString = (fontData) => new Promise(resolve => {
  const header = [fontData.width.toString(), fontData.height.toString()];
  let numCharsHEX = padder(fontData.pixelData.length.toString(16), 4).toUpperCase();

  let thirdByte = "0x" + numCharsHEX.substring(2,4);
  let fourthByte = "0x" + numCharsHEX.substring(0,2);

  header.push(thirdByte, fourthByte)

  let rawFontData = [];

  for (let char of fontData.pixelData) {
    for (let col of char) {
      let binary = col.join('');
      let paddedHex = padder(parseInt(binary, 2).toString(16), 2);
      let hex = `0x${paddedHex.toUpperCase()}`;
      rawFontData.push(hex);
    }
  }

  let fontArray = [];
  fontArray.push(...header, ...rawFontData);

  resolve(licence("<Your Name>", fontArray, fontData.width, fontData.height))
});
  
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

  const [downloadReady, setDownloadReady] = useState(false);

  const updateFontData = (newData) => {
    setDownloadReady(false);
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
        height: parseInt(newHeight),
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
        width: parseInt(newWidth),
        pixelData: pixelDataUpdated
      });
    }
  }

  const handleCharInput = (value) => {
    if (value === undefined || value === null || value === "") {
      setFontData((currentState) => {
        return {
          ...currentState,
          currentChar: 0
        }
      })
    } else {
      const intVal = parseInt(value);
      const charsToAdd = intVal - (fontData.pixelData.length-1);
      if (charsToAdd > 0) {
        addChar(charsToAdd);
      }

      updateFontData({
        currentChar: intVal
      });
    }
  }

  const addChar = (value) => {
    let pixelDataUpdated = fontData.pixelData.slice();

    for (let i = 0; i < value; i++) {
      let newChar = [];
      for (let x = 0; x < fontData.width; x++) {
        let column = new Array(fontData.height).fill(0);
        newChar.push(column);
      }
      pixelDataUpdated.push(newChar);
    }

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


  const clearChar = () => {
    let pixelDataUpdated = fontData.pixelData.slice();
    for (const col of pixelDataUpdated[fontData.currentChar]) {
      col.fill(0);
    }
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
      <div>
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
      <br></br>
      <div>
        {downloadReady ? <a
          download={"MYCOOLFONT.h"}
          href={downloadReady}
          onClick= {() => setDownloadReady(false)}
        >
          Download
        </a> : 
          <Button
            text={downloadReady ? "Download" : "Convert"}
            onClick={() => {
              fontToString(fontData).then(file => {
                setDownloadReady(URL.createObjectURL(new Blob([file])))
              })
            }}
          />}
        <Button
          text="Clear"
          onClick={() => clearChar()}
        />
      </div>
      
      
    </div>
  );
}

export default Font;
