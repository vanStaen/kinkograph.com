import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { Badge, Select, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { pictureStore } from "../../../store/pictureStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./GalleryHeader.css";

export const GalleryHeaderLeft = observer(() => {
  const { Option } = Select;
  const [showFilter, setShowFilter] = useState(false);

  const filterIconClickHandler = () => {
    const filterElement = document.getElementsByClassName(
      "galleryHeader__selectFilter"
    );
    if (!showFilter) {
      setShowFilter(true);
      setTimeout(() => {
        filterElement[0].style.width = "300px";
      }, [50]);
    } else {
      filterElement[0].style.width = "0px";
      setTimeout(() => {
        setShowFilter(false);
      }, [350]);
    }
  };

  const handleTagChange = useCallback((fitlerArray) => {
    pictureStore.setIsGalleryLoading(true);
    const fitlerArrayCleaned = fitlerArray.map((tag) => {
      return capitalizeFirstLetter(tag);
    });
    pictureStore.setFilter(fitlerArrayCleaned);
  }, []);

  const handleSelectBlur = useCallback(() => {
    if (pictureStore.filter.length === 0) {
      const filterElement = document.getElementsByClassName(
        "galleryHeader__selectFilter"
      );
      filterElement[0].style.width = "0px";
      setTimeout(() => {
        setShowFilter(false);
      }, [350]);
    }
  }, []);

  return (
    <div
      className="galleryHeader__left"
      onFocus={() => {
        pictureStore.setIsTagInputActive(true);
      }}
      onBlur={() => {
        pictureStore.setIsTagInputActive(false);
      }}
    >
      <Tooltip title="Filters">
        <Badge
          count={pictureStore.filter.length}
          offset={[0, 5]}
          size="small"
          style={{ backgroundColor: "darkgoldenrod" }}
        >
          <SearchOutlined
            onClick={filterIconClickHandler}
            className="link galleryHeader__fitlerIcon"
          />
        </Badge>
      </Tooltip>

      {showFilter && (
        <Select
          mode="multiple"
          defaultValue={pictureStore.filter}
          onChange={handleTagChange}
          onBlur={handleSelectBlur}
          className="galleryHeader__selectFilter"
          optionLabelProp="label"
          autoFocus={true}
          filterOption={(inputValue, option) => {
            //work around to make search case sensitive
            if (!option.value) {
              return false;
            }
            return option.value.includes(capitalizeFirstLetter(inputValue));
          }}
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
      )}

      {/* 
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
      )}*/}
    </div>
  );
});
