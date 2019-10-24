import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import portrait from "./img/portrait.png";

const appStyle = {
  position: "relative",
  backgroundColor: "gray",
  width: "500px",
  height: "500px",
  overflow: "hidden"
};

const translateZoneStyle = {
  height: "100%",
  wight: "100%",
  top: 0,
  left: 0,
  textAlign: "left",
  transition: "all .5s linear"
};

const scaleZoneStyle = {
  height: "100%",
  wight: "100%",
  top: 0,
  left: 0,
  textAlign: "left",
  // transformOrigin: "56px 107.5546875px",
  transition: "all .5s linear"
};

const getCenter = ({ left, top, width, height }) => {
  return {
    cx: left + width / 2,
    cy: top + height / 2
  };
};

const App = () => {
  const scaleRef = useRef(null);
  const translateRef = useRef(null);
  const imgRef = useRef(null);

  const [rectCx, setRectCx] = useState(0);
  const [rectCy, setRectCy] = useState(0);

  const logRect = () => {
    console.log(imgRef.current.getBoundingClientRect());
    const rectCenter = getCenter(imgRef.current.getBoundingClientRect());
    setRectCx(rectCenter.cx);
    setRectCy(rectCenter.cy);
  };

  useEffect(() => {
    scaleRef.current.style.transformOrigin = `${rectCx}px ${rectCy}px`;
  });

  const scale = () => {
    scaleRef.current.style.transform = `scale(60)`;
    translate();
  };

  const translate = () => {
    const container = translateRef.current.getBoundingClientRect();
    const x = container.width / 2 - rectCx;
    const y = container.height / 2 - rectCy;

    console.log(container, x, y);
    console.log(`translate(${x}px ${y}px)`);
    translateRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div className="App" style={appStyle}>
      <div id="translate-zone" ref={translateRef} style={translateZoneStyle}>
        <div id="scale-zone" ref={scaleRef} style={scaleZoneStyle}>
          <img
            src={portrait}
            ref={imgRef}
            className="position-absolute"
            style={{
              width: "10px",
              height: "auto",
              top: "100px",
              left: "50px"
            }}
            onLoad={logRect}
            alt="asdf"
          />
        </div>
      </div>
      <div className="position-absolute d-flex" style={{ top: 0, right: 0 }}>
        <button onClick={logRect}>logRect</button>
        <button onClick={scale}>scale</button>
        <button onClick={translate}>translate</button>
      </div>
    </div>
  );
};

export default App;
