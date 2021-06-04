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
        {pictureStore.filter.length === 0 ? (
          <div className="kinkograph__title">kinkograph</div>
        ) : (
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={pictureStore.filter}
            onChange={() => {
              console.log("Hello");
            }}
          >
            {allTags.map((tag) => {
              return (
                <Option key={capitalizeFirstLetter(tag.tag_name)}>
                  {capitalizeFirstLetter(tag.tag_name)}
                </Option>
              );
            })}
          </Select>
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
