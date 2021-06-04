import React, { Fragment, useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { Select } from "antd";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import { getTags } from "../../../component/EditDrawer/getTags";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  const [allTags, setAllTags] = useState([]);
  const { Option } = Select;

  const fetchAllTags = useCallback(async () => {
    try {
      const fetchedTags = await getTags();
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleTagChange = useCallback(async (fitlerArray) => {
    const fitlerArrayCleaned = fitlerArray.map((tag) => {
      return capitalizeFirstLetter(tag);
    });
    console.log(fitlerArrayCleaned);
    pictureStore.setFilter(fitlerArrayCleaned);
  }, []);

  const handleClickFilterTitle = () => {
    pictureStore.setShowFilterSelect(true);
  };

  useEffect(() => {
    fetchAllTags();
  }, [fetchAllTags]);

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
        {pictureStore.filter.length > 0 || pictureStore.showFilterSelect ? (
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select a filter"
            defaultValue={pictureStore.filter}
            onChange={handleTagChange}
            className="galleryHeader__selectFilter"
          >
            {allTags.map((tag) => {
              return (
                <Option key={capitalizeFirstLetter(tag.tag_name)}>
                  {capitalizeFirstLetter(tag.tag_name)}
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
        <div className="galleryHeader__BigFont">
          <b>Page {pictureStore.pageNumber}</b>
          <span style={{ fontSize: "0.7em" }}>
            {" "}
            /{" "}
            {Math.ceil(pictureStore.totalPictures / pictureStore.PAGE_SIZE, 0)}
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
