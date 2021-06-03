import React, { Fragment } from "react";
import { observer } from "mobx-react";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  return (
    <div className="galleryHeader__main">
      <div className="galleryHeader__left">
        {userStore.favorites.length ? (
          <Fragment>
            <div className="galleryHeader__BigFont galleryHeader__favorite">
              {userStore.favorites.length} picture
              {userStore.favorites.length > 1 && "s"}
            </div>
            <div className="galleryHeader__SmallFont">
              marked as favorite{userStore.favorites.length > 1 && "s"}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="galleryHeader__BigFont galleryHeader__favorite">
              Hello {userStore.user.name},
            </div>
            <div className="galleryHeader__SmallFont">
              What will inspire you today?
            </div>
          </Fragment>
        )}
      </div>
      <div className="galleryHeader__center">
        {pictureStore.filter.length === 0 ? (
          <div className="kinkograph__title">kinkograph</div>
        ) : (
          pictureStore.filter.map((filter) => <span>#{filter} </span>)
        )}
      </div>
      <div className="galleryHeader__right">
        <div className="galleryHeader__BigFont">
          <b>Page {pictureStore.pageNumber}</b>
          <span style={{ fontSize: "0.7em" }}>
            {" "}
            /{" "}
            {Math.floor(pictureStore.totalPictures / pictureStore.PAGE_SIZE, 0)}
          </span>
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
