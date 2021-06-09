import React, { useState, useEffect, useCallback, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";

import { getFilteredTags } from "../../../store/calls/getTags";
import { getPictures } from "../../../store/calls/getPictures";
import { EditDrawer } from "../Uploader/EditDrawer/EditDrawer";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./PicAdmin.css";

const { Option } = Select;

export const PicAdmin = () => {
  const [isLoading, setIsloading] = useState(true);
  const [allPictures, setAllPictures] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pictureSelected, setPictureSelected] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [tagSelected, setTagSelected] = useState(null);

  const fetchAllPictures = useCallback(async () => {
    try {
      const fetchedPics = await getPictures(0, true);
      const fetchedTags = await getFilteredTags([]);
      setAllPictures(fetchedPics);
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
    setIsloading(false);
  }, []);

  const pictureClickHandle = (picture) => {
    setShowDrawer(true);
    setPictureSelected(picture);
  };

  useEffect(() => {
    fetchAllPictures();
  }, [fetchAllPictures]);

  return (
    <Fragment>
      {pictureSelected && (
        <EditDrawer
          picture={pictureSelected}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
      )}
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
          <div className="gallery__spinnerText">loading</div>
        </div>
      ) : (
        <Fragment>
          <div className="picAdmin__tagSelector">
            <Select
              allowClear={false}
              style={{ width: "100%" }}
              placeholder="Select a tag to manage"
              allowClear
              onChange={(value) => {
                setTagSelected(value);
              }}
            >
              {allTags.map((tag) => {
                return (
                  <Option key={capitalizeFirstLetter(tag.tag)}>
                    {capitalizeFirstLetter(tag.tag)} ({tag.occur})
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="picAdmin__main">
            {allPictures.map((picture) => {
              return (
                <img
                  className={
                    picture.tags.includes(tagSelected)
                      ? "picAdmin__tagHalo"
                      : "picAdmin__tagSepia"
                  }
                  id={`pic_${picture.id}`}
                  src={picture.url_thumb}
                  alt={picture.id}
                  key={picture.id}
                  onClick={() => pictureClickHandle(picture)}
                />
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
