import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className=" relative center ma">
      <div className=" img-container mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          // width="500px;"
          // height="auto"
        />

        <div
          className="bounding-box"
          style={{
            width: `${box.endX - box.startX}px`,
            height: `${box.endY - box.startY}px`,
            top: `${box.startY}px`,
            right: `${box.endX}px`,
            bottom: `${box.endY}px`,
            left: `${box.startX}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
