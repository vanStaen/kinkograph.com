import React, { useRef, useEffect, useCallback, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pictureStore } from "../../store/pictureStore";
import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { GalleryOverlay } from "../../component/GalleryOverlay/GalleryOverlay";
import { GalleryHeader } from "./GalleryHeader/GalleryHeader";
import { GalleryFooter } from "./GalleryFooter/GalleryFooter";
import { FavoritesDrawer } from "../../component/FavoritesDrawer/FavoritesDrawer";

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

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight * 0.9
    ) {
      pictureStore.nextPageLazyLoader();
      pictureStore.fetchNewAndAddPictures();
    }
  };

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
              nextPageLocalHandler(true);
            } else if (
              keyPressed === "arrowleft" &&
              pictureStore.pageNumber > 1
            ) {
              nextPageLocalHandler(false);
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

  const nextPageLocalHandler = async (value) => {
    await pictureStore.nextPageHandler(value);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="gallery">
      <GalleryHeader />
      <FavoritesDrawer />
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
                  <div className="gallery__picture" key={index}>
                    <PictureThumb picture={picture} key={picture.id} />
                  </div>
                );
              })}
            </div>
            <GalleryFooter />
          </div>
        </Fragment>
      )}
    </div>
  );
});
