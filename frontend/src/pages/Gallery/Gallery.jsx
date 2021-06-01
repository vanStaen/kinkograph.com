import React, { useRef, useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { getPictures } from "./getPictures";

import "./Gallery.css";

export const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const limit = useRef(100);
  const showMissing = true;

  const fetchPictures = useCallback(async () => {
    try {
      const pictures = await getPictures(limit.current, showMissing);
      setPictures(pictures);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [getPictures]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const nextPageHandler = () => {
    const newLimit = limit.current + 50;
    limit.current = newLimit;
    fetchPictures(newLimit);
  };

  /*const scrollHandler = async () => {
    let scrollMaxY =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (window.scrollY > scrollMaxY * 0.8) {
      console.log("80% of scroll reached!");
      const newLimit = limit.current + 50;
      limit.current = newLimit;
      await fetchPictures(newLimit);
    }
  };*/

  /*useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);*/

  return (
    <div>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
        </div>
      ) : (
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
              Previous |{" "}
              <span className="gallery__nextText" onClick={nextPageHandler}>
                Next
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/*
<div className="item item__landscape">item__landscape</div>
<div className="item item__square">item__square</div>
<div className="item item__portrait">item__portrait</div>
*/
