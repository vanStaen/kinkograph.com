import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { observer } from "mobx-react";

import { overlayStore } from "../../store/overlayStore";
import { userStore } from "../../store/userStore";

import "./GalleryOverlay.css";

export const GalleryOverlay = observer((props) => {
  const throttling = useRef(false);
  const selected = overlayStore.allPictures[overlayStore.selected];
  const indexInSelected = userStore.favorites.findIndex(
    (pictureId) => pictureId === selected.id
  );
  const isFavorite = indexInSelected >= 0;

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

  const doubleClickHandler = (id) => {
    const heart = document.getElementById(`heart`);
    const unheart = document.getElementById(`unheart`);
    if (!isFavorite) {
      heart.style.visibility = "visible";
      heart.style.opacity = 0.5;
      heart.style.fontSize = "50em";
      setTimeout(() => {
        heart.style.visibility = "hidden";
        heart.style.opacity = 0;
        heart.style.fontSize = "1em";
      }, 500);
      userStore.addToFavorite(id);
    } else {
      unheart.style.visibility = "visible";
      unheart.style.opacity = 0.5;
      unheart.style.fontSize = "30em";
      setTimeout(() => {
        unheart.style.visibility = "hidden";
        unheart.style.opacity = 0;
        unheart.style.fontSize = "1em";
      }, 500);
      userStore.deleteFromFavorite(id);
    }
  };

  const keyDownHandler = useCallback(
    (event) => {
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
        } else if (keyPressed === "enter") {
          doubleClickHandler(selected.id);
        } else if (keyPressed === "escape") {
          overlayStore.setShowOverlay(false);
        }
        setTimeout(() => {
          throttling.current = false;
        }, 100);
      }
    },
    [selected, doubleClickHandler]
  );

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
        onDoubleClick={() => {
          doubleClickHandler(selected.id);
        }}
      >
        <div className="gallery__infoAction">
          {selected && <div className="gallery__info">#{selected.id}</div>}
          <div className="gallery__action">
            {isFavorite ? (
              <Fragment>
                <span style={{ fontSize: ".75em" }}>❤️</span> Marked as
                favorite!
              </Fragment>
            ) : (
              "Doubleclick/Enter to mark as favorite."
            )}
          </div>
        </div>
        <div className="gallery__pictureHover">
          <div className="gallery__pictureWatermark">KINKOGRAPH</div>
          <HeartFilled id="heart" className="gallery__heart" />
          <CloseOutlined id="unheart" className="gallery__heart" />
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
