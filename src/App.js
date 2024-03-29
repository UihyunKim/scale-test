import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import portrait from "./img/portrait.png";
import anime from "animejs";

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
  textAlign: "left"
  // transition: "all .5s linear"
};

const scaleZoneStyle = {
  height: "100%",
  wight: "100%",
  top: 0,
  left: 0,
  textAlign: "left"
  // transition: "all .5s linear"
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
  const sliderRef = useRef(null);

  const [rectCx, setRectCx] = useState(0);
  const [rectCy, setRectCy] = useState(0);
  const [slider, setSlider] = useState(0);

  const logRect = () => {
    console.log(imgRef.current.getBoundingClientRect());
    const rectCenter = getCenter(imgRef.current.getBoundingClientRect());
    setRectCx(rectCenter.cx);
    setRectCy(rectCenter.cy);
  };

  const scale = () => {
    anime({
      targets: scaleRef.current,
      transformOrigin: [`${rectCx}px ${rectCy}px`, `${rectCx}px ${rectCy}px`],
      scale: 40,
      easing: "linear"
    });
  };

  const animeInit = () => {
    const container = translateRef.current.getBoundingClientRect();
    const x = container.width / 2 - rectCx;
    const y = container.height / 2 - rectCy;
    const innerTl = anime
      .timeline({
        direction: "alternate",
        easing: "linear",
        duration: 1000,
        update: () => {
          // console.log("update: ", innerTl.progress, slider);
          // setSlider(innerTl.progress);
        }
      })
      .add({
        targets: scaleRef.current,
        transformOrigin: [`${rectCx}px ${rectCy}px`, `${rectCx}px ${rectCy}px`],
        scale: 40
      })
      .add(
        {
          targets: translateRef.current,
          translateX: x,
          translateY: y
        },
        0
      );

    // tl.pause();
    return innerTl;
  };

  useEffect(() => {
    const tl = animeInit();
    tl.seek(tl.duration * (slider / 100));
  });

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
        <input
          ref={sliderRef}
          step=".001"
          type="range"
          min="0"
          max="100"
          value={slider}
          onChange={e => {
            console.log(e.target.value, slider);
            if (e.target.value !== slider) {
              setSlider(e.target.value);
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default App;
