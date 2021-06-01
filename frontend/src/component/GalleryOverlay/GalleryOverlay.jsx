import React from "react";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";

import { overlayStore } from "../../store/overlayStore";

import "./GalleryOverlay.css";

export const GalleryOverlay = (props) => {
  const mouseHoverHandler = (hover) => {
    const closeButton = document.getElementById(`closeButton`);
    if (hover) {
      closeButton.style.visibility = "hidden";
      closeButton.style.opacity = 0;
    } else {
      closeButton.style.visibility = "visible";
      closeButton.style.opacity = 1;
    }
  };

  return (
    <div className="gallery__overlay">
      <div className="gallery__columnLeft">
        <LeftOutlined />
      </div>
      <div
        className="gallery__columnRight"
        onMouseEnter={() => mouseHoverHandler(true)}
        onMouseLeave={() => mouseHoverHandler(false)}
      >
        <RightOutlined />
      </div>
      <div
        className="gallery__closeButton"
        id="closeButton"
        onClick={() => {
          overlayStore.setShowOverlay(false);
        }}
      >
        <CloseOutlined />
      </div>
    </div>
  );
};
