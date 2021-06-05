import React, { Fragment, useCallback } from "react";
import { observer } from "mobx-react";
import { Select, Tooltip } from "antd";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  const { Option } = Select;

  const handleTagChange = useCallback(async (fitlerArray) => {
    pictureStore.setIsGalleryLoading(true);
    const fitlerArrayCleaned = fitlerArray.map((tag) => {
      return capitalizeFirstLetter(tag);
    });
    pictureStore.setFilter(fitlerArrayCleaned);
  }, []);

  const handleClickFilterTitle = () => {
    pictureStore.setShowFilterSelect(true);
  };

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
              Hello {userStore.name},
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
        {pictureStore.filter.length > 0 || pictureStore.showFilterSelect ? (
          <Select
            mode="multiple"
            style={{ width: "100%" }}
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
        ) : (
          <div
            className="galleryHeader__setFilter"
            onClick={handleClickFilterTitle}
          >
            &#123;click here to{" "}
            <span className="galleryHeader__wordFilter">filter</span> the
            results&#125;
          </div>
        )}
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
              <b>Page {pictureStore.pageNumber}</b>
              <span style={{ fontSize: "0.7em" }}>
                {" "}
                /{" "}
                {Math.ceil(
                  pictureStore.totalPictures / pictureStore.PAGE_SIZE,
                  0
                )}
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
        </Tooltip>
      </div>
    </div>
  );
});
