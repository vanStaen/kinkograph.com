import React from "react";

import { pictureStore } from "../../../store/pictureStore";

import "./GalleryFooter.css";

export const GalleryFooter = () => {
  const onlyOnePage =
    pictureStore.pageNumber === 1 && pictureStore.lastPageReached;

  return (
    !onlyOnePage && (
      <div className="gallery__next">
        <div className="gallery__nextTextContainer">
          {pictureStore.pageNumber === 1 ? (
            "Previous"
          ) : (
            <span
              className="gallery__nextText"
              onClick={() => nextPageLocalHandler(false)}
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
              onClick={() => nextPageLocalHandler(true)}
            >
              Next
            </span>
          )}
        </div>
      </div>
    )
  );
};
