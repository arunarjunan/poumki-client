import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState } from "react";
import { useRef } from "react";
import './draw.css'

const colors = ["red", "green", "yellow", "black", "blue","violet"];

export const Draw = ({ data }) => {
  const canvasRef = useRef();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [imageURL, setImageURL] = useState("");

  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    height: "500px",
    backgroundImage: `url(${data})`,
    objectFit: "fit",
  };


  const imageExport = async () => {
    const exportImage = canvasRef.current?.exportImage;
    if (exportImage) {
      const exportedDataURI = await exportImage("png");
      setImageURL(exportedDataURI);
      console.log(exportedDataURI);
      downloadURI(exportedDataURI, "image.png");
    }
  };
  const clearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <ReactSketchCanvas
        id="canvas"
        className="canva"
        width="100%"
        height="100%"
        style={styles}
        strokeWidth={4}
        strokeColor={selectedColor}
        backgroundImage={data}
        ref={canvasRef}
        exportWithBackgroundImage
      ></ReactSketchCanvas>

      <div className="row mt-3">
        <div className="col">
        <select
          className="form-select text-capitalize"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      
        </div>
        <div className="col">
        <button onClick={clearCanvas} className="w-100 btn btn-lg btn-primary">Clear</button>
        </div>
        <div className="col">
        <button onClick={imageExport} className="w-100 btn btn-lg btn-primary">Download</button>
        </div>
       
        
        
      </div>
    </>
  );
};