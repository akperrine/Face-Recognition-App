import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import face from "./Face.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt shadow-2">
        <div className="pa3">
          <h1>
            <img style={{ paddingTop: "4px" }} src={face} alt="logo" />
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
