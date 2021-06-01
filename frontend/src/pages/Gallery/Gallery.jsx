import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { overlayStore } from "../../store/overlayStore";
import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { GalleryOverlay } from "../../component/GalleryOverlay/GalleryOverlay";
import { getPicturesPerPage } from "./getPictures";

import "./Gallery.css";

const PAGE_SIZE = 100;

export const Gallery = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const pageNumber = useRef(1);
  const lastPageReached = useRef(false);

  const fetchPictures = useCallback(async () => {
    try {
      const pictures = await getPicturesPerPage(pageNumber.current, PAGE_SIZE);
      if (pictures.length < PAGE_SIZE) {
        lastPageReached.current = true;
      } else {
        lastPageReached.current = false;
      }
      setPictures(pictures);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [getPicturesPerPage]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const nextPageHandler = (next) => {
    setIsLoading(true);
    if (next) {
      const nextPage = pageNumber.current + 1;
      pageNumber.current = nextPage;
      fetchPictures(nextPage);
    } else {
      const previousPage = pageNumber.current - 1;
      pageNumber.current = previousPage;
      fetchPictures(previousPage);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
        </div>
      ) : (
        <Fragment>
          {overlayStore.showOverlay && <GalleryOverlay />}
          <div className="gallery">
            <div className="gallery__main">
              {pictures.map((picture) => {
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
                {pageNumber.current === 1 ? (
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
                {lastPageReached.current ? (
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
