import React, { useCallback, useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined, CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { overlayStore } from "../../store/overlayStore";

import "./GalleryOverlay.css";

export const GalleryOverlay = observer((props) => {
  const throttling = useRef(false);
  const selected = overlayStore.allPictures[overlayStore.selected];

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

  const keyDownHandler = useCallback((event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    const nextButton = document.getElementById(`nextButton`);
    const previousButton = document.getElementById(`previousButton`);
    if (throttling.current === false) {
      throttling.current = true;
      if (keyPressed === "arrowdown" || keyPressed === "arrowright") {
        nextButton.style.backgroundColor = "rgba(255,255,255,.15)";
        overlayStore.changeSelected(true);
        setTimeout(() => {
          nextButton.style.backgroundColor = "rgba(255,255,255, 0)";
        }, 100);
      } else if (keyPressed === "arrowup" || keyPressed === "arrowleft") {
        previousButton.style.backgroundColor = "rgba(255,255,255,.15)";
        overlayStore.changeSelected(false);
        setTimeout(() => {
          previousButton.style.backgroundColor = "rgba(255,255,255, 0)";
        }, 100);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 100);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className="gallery__overlay">
      <div
        className="gallery__background"
        onClick={() => {
          overlayStore.setShowOverlay(false);
        }}
      ></div>
      <div
        className="gallery__columnLeft"
        id="previousButton"
        onClick={() => {
          overlayStore.changeSelected(false);
        }}
      >
        <LeftOutlined />
      </div>
      <div
        className="gallery__columnRight"
        id="nextButton"
        onMouseEnter={() => mouseHoverHandler(true)}
        onMouseLeave={() => mouseHoverHandler(false)}
        onClick={() => {
          overlayStore.changeSelected(true);
        }}
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

      <div
        className="gallery__pictureContainer"
        onDoubleClick={() => alert("DoubleCLick")}
      >
        <div className="gallery__pictureHover">
          <div className="gallery__pictureWatermark">KINKOGRAPH</div>
        </div>
        {selected && (
          <img
            className="gallery__picture"
            src={selected.url_med}
            alt={selected.id}
            key={selected.id}
          />
        )}
      </div>
    </div>
  );
});
