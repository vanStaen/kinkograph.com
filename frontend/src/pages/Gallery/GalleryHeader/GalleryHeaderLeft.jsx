import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { Tooltip } from "antd";

import { userStore } from "../../../store/userStore";
import { favoriteStore } from "../../../store/favoriteStore";
import { isMobileCheck } from "../../../helpers/checkMobileTablet";

import "./GalleryHeader.css";

export const GalleryHeaderLeft = observer(() => {
  const isMobile = isMobileCheck();

  const handleClickShowFavoritesDrawer = () => {
    favoriteStore.setShowFavorites(true);
  };

  return (
    <div className="galleryHeader__left">
      {isMobile ? (
        <div className="galleryHeader__BigFont">
          <span
            className="galleryHeader__favoriteMobile pointer"
            onClick={handleClickShowFavoritesDrawer}
          >
            {favoriteStore.favoritesId.length} ♡
          </span>
        </div>
      ) : favoriteStore.favoritesId.length ? (
        <Fragment>
          <div className="galleryHeader__BigFont">
            <span className="pointer" onClick={handleClickShowFavoritesDrawer}>
              {favoriteStore.favoritesId.length} picture
              {favoriteStore.favoritesId.length > 1 && "s"}
            </span>
          </div>
          <div className="galleryHeader__SmallFont">
            marked as favorite{favoriteStore.favoritesId.length > 1 && "s"}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="galleryHeader__BigFont">
            {userStore.firstname ? (
              <Tooltip
                placement="bottomLeft"
                title={
                  <span>
                    <b>TIP: </b>When browsing the gallery, mark some pictures as
                    your favorites.
                  </span>
                }
              >
                Hello {userStore.firstname},
              </Tooltip>
            ) : (
              "Hello stranger,"
            )}
          </div>
          <div className="galleryHeader__SmallFont">
            What will inspire you today?
          </div>
        </Fragment>
      )}
    </div>
  );
});
