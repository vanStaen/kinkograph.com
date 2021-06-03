import React from "react";
import { observer } from "mobx-react";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  return (
    <div className="galleryHeader__main">
      <div
        className={`galleryHeader__left ${
          userStore.favorites.length === 0 && "opacitied"
        }`}
      >
        <div className="galleryHeader__BigFont">
          {userStore.favorites.length} picture
          {userStore.favorites.length > 1 && "s"}
        </div>
        <div className="galleryHeader__SmallFont">
          marked as favorite{userStore.favorites.length > 1 && "s"}
        </div>
      </div>
      <div className="galleryHeader__center">
        {pictureStore.filter.length === 0 ? (
          <span>no filter yet </span>
        ) : (
          pictureStore.filter.map((filter) => <span>#{filter} </span>)
        )}
      </div>
      <div className="galleryHeader__right">
        <div className="galleryHeader__BigFont">
          Page {pictureStore.pageNumber}
        </div>
        <div className="galleryHeader__SmallFont">
          {(pictureStore.pageNumber - 1) * pictureStore.PAGE_SIZE + 1}-
          {Math.min(
            pictureStore.pageNumber * pictureStore.PAGE_SIZE,
            pictureStore.totalPictures
          )}{" "}
          of {pictureStore.totalPictures}
        </div>
      </div>
    </div>
  );
});
