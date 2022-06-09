import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { Select } from "antd";

import { pictureStore } from "../../../store/pictureStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import { isMobileCheck } from "../../../helpers/checkMobileTablet";

import "./GalleryHeader.css";

export const GalleryHeaderFilter = observer(() => {
  const isMobile = isMobileCheck();
  const { Option } = Select;

  const handleTagChange = useCallback(async (fitlerArray) => {
    pictureStore.setIsGalleryLoading(true);
    const fitlerArrayCleaned = fitlerArray.map((tag) => {
      return capitalizeFirstLetter(tag);
    });
    pictureStore.setFilter(fitlerArrayCleaned);
  }, []);

  return (

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
          placeholder={isMobile ? "Filter" : "Select a filter"}
          defaultValue={pictureStore.filter}
          onChange={handleTagChange}
          className="galleryHeader__selectFilter"
          optionLabelProp="label"
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
      </div>
  );
});
