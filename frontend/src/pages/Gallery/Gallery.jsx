import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pictureStore } from "../../store/pictureStore";
import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { GalleryOverlay } from "../../component/GalleryOverlay/GalleryOverlay";
import { getPicturesPerPage } from "./getPictures";

import "./Gallery.css";

export const Gallery = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const throttling = useRef(false);

  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = image.url_thumb;
      loadImg.onload = () => resolve(image.url);
      loadImg.onerror = (err) => reject(err);
    });
  };

  const fetchPictures = useCallback(async () => {
    try {
      const pictures = await getPicturesPerPage(
        pictureStore.pageNumber,
        pictureStore.PAGE_SIZE
      );
      if (pictures.length < pictureStore.PAGE_SIZE) {
        pictureStore.setLastPageReached(true);
      } else {
        pictureStore.setLastPageReached(false);
      }
      await Promise.all(pictures.map((picture) => loadImage(picture)));
      pictureStore.setAllPictures(pictures);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const nextPageHandler = useCallback(
    (next) => {
      setIsLoading(true);
      if (next) {
        const nextPage = pictureStore.pageNumber + 1;
        pictureStore.setPageNumber(nextPage);
        fetchPictures(nextPage);
      } else {
        const previousPage = pictureStore.pageNumber - 1;
        pictureStore.setPageNumber(previousPage);
        fetchPictures(previousPage);
      }
    },
    [fetchPictures]
  );

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
      if (!pictureStore.showOverlay) {
        event.preventDefault();
        const keyPressed = event.key.toLowerCase();
        if (throttling.current === false) {
          throttling.current = true;
          if (keyPressed === "arrowright" && !pictureStore.lastPageReached) {
            nextPageHandler(true);
          } else if (
            keyPressed === "arrowleft" &&
            pictureStore.pageNumber > 1
          ) {
            nextPageHandler(false);
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
    },
    [scroll, nextPageHandler]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <div>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
          <div className="gallery__spinnerText">loading</div>
        </div>
      ) : (
        <Fragment>
          {pictureStore.showOverlay && <GalleryOverlay />}
          <div className="gallery">
            <div className="gallery__main">
              {pictureStore.allPictures.map((picture, index) => {
                return (
                  <PictureThumb
                    picture={picture}
                    reload={fetchPictures}
                    key={picture.id}
                  />
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
                    onClick={() => nextPageHandler(false)}
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
                    onClick={() => nextPageHandler(true)}
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
