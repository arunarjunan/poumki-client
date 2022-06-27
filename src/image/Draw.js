import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState,useEffect } from "react";
import { useRef } from "react";
import './draw.css'

const colors = ["red", "green", "yellow", "black", "blue","violet"];

export const Draw = ({ data }) => {
  const canvasRef = useRef();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [imageURL, setImageURL] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [style, setStyle] = useState({});
  const [key, setKey] = useState("");

  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    backgroundImage: `url(${data})`,
    objectFit: "fit",
  };


  useEffect(()=>{
    var img = new Image();
    img.onload = function() {
      console.log("Image Size",`${img.height} : ${img.width}`);
    setHeight(img.height);
    setWidth(img.width);
    setStyle(styles)

    canvasRef.current.clearCanvas();
    setKey(data)
    }
    img.src = data;
  },[data])

  const imageExport = async () => {
    const exportImage = canvasRef.current?.exportImage;

    if (exportImage) {
      const exportedDataURI = await exportImage("jpg");
      setImageURL(exportedDataURI);
      console.log(exportedDataURI);
      downloadURI(exportedDataURI, "image.jpg");
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
        key={key}
        className="canva"
        width={width}
        height={height}
        style={style}
        strokeWidth={4}
        strokeColor={selectedColor}
        backgroundImage={data}
        ref={canvasRef}
        exportWithBackgroundImage={true}
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