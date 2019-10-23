import React, { useEffect, useRef } from "react";
import "./App.css";
import portrait from "./img/portrait.png";

const appStyle = {
  position: "relative",
  width: "500px",
  height: "500px",
  border: "1px solid red"
};

const scaleZoneStyle = {
  height: "100%",
  wight: "100%",
  top: 0,
  left: 0,
  border: "2px solid blue",
  textAlign: "left",
  transformOrigin: "0 0",
  padding: "100px"
};

const App = () => {
  const scaleRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    console.log(imgRef.current.getBoundingClientRect());
  });

  const logRect = () => {
    console.log(imgRef.current.getBoundingClientRect());
  };

  const doubleScale = () => {
    scaleRef.current.style.transform = "scale(10)";
  };

  const moveTopLeft = () => {
    const imgRect = imgRef.current.getBoundingClientRect();
    // scaleRef.current.style.transform = `scale(2) translateX(-${imgRect.left}px) translateY(-${imgRect.top}px)`;
    scaleRef.current.style.transform = `scale(10) translateX(-${imgRect.left /
      10}px) translateY(-${imgRect.top / 10}px)`;
  };

  return (
    <div className="App" style={appStyle}>
      <div id="scale-zone" ref={scaleRef} style={scaleZoneStyle}>
        <img
          src={portrait}
          ref={imgRef}
          style={{ width: "100px", height: "auto" }}
          onLoad={logRect}
          alt="asdf"
        />
      </div>
      <div className="position-absolute d-flex" style={{ top: 0, right: 0 }}>
        <button onClick={logRect}>logRect</button>
        <button onClick={doubleScale}>scale</button>
        <button onClick={moveTopLeft}>moveTopLeft</button>
      </div>
    </div>
  );
};

export default App;
