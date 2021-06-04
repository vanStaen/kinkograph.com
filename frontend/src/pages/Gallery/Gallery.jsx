import React, { useRef, useEffect, useCallback, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pictureStore } from "../../store/pictureStore";
import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { GalleryOverlay } from "../../component/GalleryOverlay/GalleryOverlay";
import { GalleryHeader } from "./GalleryHeader/GalleryHeader";

import "./Gallery.css";

export const Gallery = observer(() => {
  const throttling = useRef(false);

  useEffect(() => {
    if (pictureStore.galleryNeedsRefresh) {
      pictureStore.fetchPictures();
      pictureStore.setGalleryNeedsRefresh(false);
    }
    // eslint-disable-next-line
  }, [pictureStore.galleryNeedsRefresh]);

  const scroll = useCallback((direction) => {
    const eightyPerCentOfHeight = window.innerHeight * 0.8;
    const scrollPositionY = window.scrollY;
    let scrollToPositionY;
    if (direction === "down") {
      scrollToPositionY = scrollPositionY + eightyPerCentOfHeight;
    } else if (direction === "up") {
      scrollToPositionY = Math.max(scrollPositionY - eightyPerCentOfHeight, 0);
    }
    window.scroll({
      top: scrollToPositionY,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const keyDownHandler = useCallback(
    (event) => {
      const keyPressed = event.key.toLowerCase();
      if (
        keyPressed === "arrowright" ||
        keyPressed === "arrowleft" ||
        keyPressed === "arrowdown" ||
        keyPressed === "arrowup"
      ) {
        event.preventDefault();
        if (!pictureStore.showOverlay && !pictureStore.isTagInputActive) {
          if (throttling.current === false) {
            throttling.current = true;
            if (keyPressed === "arrowright" && !pictureStore.lastPageReached) {
              pictureStore.setShowFilterSelect(false);
              pictureStore.nextPageHandler(true);
            } else if (
              keyPressed === "arrowleft" &&
              pictureStore.pageNumber > 1
            ) {
              pictureStore.setShowFilterSelect(false);
              pictureStore.nextPageHandler(false);
            } else if (keyPressed === "arrowdown") {
              scroll("down");
            } else if (keyPressed === "arrowup") {
              scroll("up");
            }
            setTimeout(() => {
              throttling.current = false;
            }, 100);
          }
        }
      }
    },
    [scroll]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div className="gallery">
      <GalleryHeader />
      {pictureStore.isGalleryLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
          <div className="gallery__spinnerText">loading</div>
        </div>
      ) : (
        <Fragment>
          {pictureStore.showOverlay && <GalleryOverlay />}
          <div>
            <div className="gallery__main">
              {pictureStore.allPictures.map((picture, index) => {
                return (
                  <div className="gallery__picSpacer">
                    <PictureThumb picture={picture} key={picture.id} />
                  </div>
                );
              })}
            </div>
            <div className="gallery__next">
              <div className="gallery__nextTextContainer">
                {pictureStore.pageNumber === 1 ? (
                  "Previous"
                ) : (
                  <span
                    className="gallery__nextText"
                    onClick={() => pictureStore.nextPageHandler(false)}
                  >
                    Previous
                  </span>
                )}
                {" | "}
                {pictureStore.lastPageReached ? (
                  "Next"
                ) : (
                  <span
                    className="gallery__nextText"
                    onClick={() => pictureStore.nextPageHandler(true)}
                  >
                    Next
                  </span>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
});

/*
<div className="item item__landscape">item__landscape</div>
<div className="item item__square">item__square</div>
<div className="item item__portrait">item__portrait</div>
*/
