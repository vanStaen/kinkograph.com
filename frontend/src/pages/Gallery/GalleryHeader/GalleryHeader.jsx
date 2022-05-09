import React, { Fragment, useCallback, useState, useRef } from "react";
import { observer } from "mobx-react";
import { Select, Tooltip } from "antd";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";
import { authStore } from "../../../store/authStore";
import { favoriteStore } from "../../../store/favoriteStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  const [showOpenLock, setShowOpenLock] = useState(false);
  const pageInputValue = useRef(pictureStore.pageNumber);
  const { Option } = Select;
  const maxPage = Math.ceil(
    pictureStore.totalPictures / pictureStore.PAGE_SIZE,
    0
  );

  const handleTagChange = useCallback(async (fitlerArray) => {
    pictureStore.setIsGalleryLoading(true);
    const fitlerArrayCleaned = fitlerArray.map((tag) => {
      return capitalizeFirstLetter(tag);
    });
    pictureStore.setFilter(fitlerArrayCleaned);
  }, []);

  const handleClickShowFavoritesDrawer = () => {
    favoriteStore.setShowFavorites(true);
  };

  const handleClickLogOut = () => {
    authStore.logout();
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const onPageInputhandler = (e) => {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    } else {
      if (e.target.innerText > maxPage) {
        console.log("Senpai, it's too big!");
        pageInputValue.current = maxPage;
      } else if (e.target.innerText < 1) {
        console.log("Oh baby, it's really small!");
        pageInputValue.current = 1;
      } else {
        pageInputValue.current = e.target.innerText;
      }
    }
  };

  const onPageInputKeyPressHanlder = (event) => {
    if (event.charCode >= 48 && event.charCode <= 57) {
    } else {
      event.preventDefault();
    }
    if (event.charCode === 13) {
      pictureStore.goToPageHandler(pageInputValue.current);
    }
  };

  return (
    <div className="galleryHeader__main">
      <div className="galleryHeader__left">
        {favoriteStore.favoritesId.length ? (
          <Fragment>
            <div className="galleryHeader__BigFont">
              <span
                className="galleryHeader__logout"
                onMouseEnter={() => setShowOpenLock(true)}
                onMouseLeave={() => setShowOpenLock(false)}
                onClick={handleClickLogOut}
              >
                <Tooltip placement="bottomLeft" title="Logout">
                  {showOpenLock ? <UnlockOutlined /> : <LockOutlined />}
                </Tooltip>
              </span>{" "}
              |{" "}
              <span
                className="galleryHeader__favorite pointer"
                onClick={handleClickShowFavoritesDrawer}
              >
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
              <span
                className="galleryHeader__logout link"
                onMouseEnter={() => setShowOpenLock(true)}
                onMouseLeave={() => setShowOpenLock(false)}
                onClick={handleClickLogOut}
              >
                <Tooltip placement="bottomLeft" title="Logout">
                  {showOpenLock ? <UnlockOutlined /> : <LockOutlined />}
                </Tooltip>
              </span>{" "}
              |{" "}
              {userStore.firstname ? (
                <Tooltip
                  placement="bottomLeft"
                  title={
                    <span>
                      <b>TIP: </b>When browsing the gallery, mark some pictures
                      as your favorites.
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
      <div
        className="galleryHeader__center"
        onFocus={() => {
          pictureStore.setIsTagInputActive(true);
        }}
        onBlur={() => {
          pictureStore.setIsTagInputActive(false);
        }}
      >
        <Select
          mode="multiple"
          style={{ width: "auto", minWidth: "200px" }}
          placeholder="Select a filter"
          defaultValue={pictureStore.filter}
          onChange={handleTagChange}
          className="galleryHeader__selectFilter"
          optionLabelProp="label"
        >
          {pictureStore.tags.map((tag) => {
            return (
              <Option value={tag.tag} label={tag.tag}>
                <div className="demo-option-label-item">
                  {tag.tag} <span className="light">({tag.occur})</span>
                </div>
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="galleryHeader__right">
        <Tooltip
          placement="bottomRight"
          title={
            <span>
              <b>TIP: </b>You can use the ← and → keys to navigate through the
              pages, and the ↑ and ↓ keys to scroll the page.
            </span>
          }
        >
          <div className="galleryHeader__pageInfo">
            <div className="galleryHeader__BigFont">
              <b>
                Page{" "}
                <div
                  className="galleryHeader__PageSelector"
                  contentEditable="true"
                  onInput={onPageInputhandler}
                  onKeyPress={onPageInputKeyPressHanlder}
                >
                  {pictureStore.pageNumber}
                </div>
              </b>
              <span style={{ fontSize: "0.7em" }}> / {maxPage}</span>
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
        </Tooltip>
      </div>
    </div>
  );
});
