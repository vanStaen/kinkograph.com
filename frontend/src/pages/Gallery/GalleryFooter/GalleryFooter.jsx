import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pictureStore } from "../../../store/pictureStore";

import "./GalleryFooter.css";

export const GalleryFooter = observer(() => {
  const maxPage = Math.ceil(
    pictureStore.totalPictures / pictureStore.PAGE_SIZE,
    0
  );

  return pictureStore.lastPageReached ? (
    <div className="galleryFooter__next">
      <div className="galleryFooter__nextContainer">
        <span className="galleryFooter__thin">
          You reached the end of the internet.
        </span>
        <span
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          Scroll back to the top
        </span>
      </div>
    </div>
  ) : pictureStore.isGalleryLazyLoading ? (
    <div className="galleryFooter__next">
      <div className="galleryFooter__nextContainer">
        <LoadingOutlined className="galleryFooter__spinner" />
        <br />
        <span className="galleryFooter__thin">Loading page</span>{" "}
        {pictureStore.pageNumber + 1} of {maxPage}
      </div>
    </div>
  ) : (
    <div className="galleryFooter__next">
      <div className="galleryFooter__nextContainer">
        Jeez, I don't Rick, this doesn't seems right.
      </div>
    </div>
  );
});
