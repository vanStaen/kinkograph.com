import React, { useState, useEffect, useCallback, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Select, Switch } from "antd";

import { getFilteredTags } from "../../../store/calls/getTags";
import { getPictures } from "../../../store/calls/getPictures";
import { EditDrawer } from "../Uploader/EditDrawer/EditDrawer";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import { PicThumbAdmin } from "./PicThumbAdmin";

import "./PicAdmin.css";

const { Option } = Select;

export const PicAdmin = () => {
  const [isLoading, setIsloading] = useState(true);
  const [allPictures, setAllPictures] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pictureSelected, setPictureSelected] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [tagSelected, setTagSelected] = useState(null);
  const [adultContentSelected, setAdultContentSelected] = useState(false);
  const [showOnlyMatchingPictures, setShowOnlyMatchingPictures] =
    useState(false);

  const fetchAllPictures = useCallback(async () => {
    try {
      const fetchedPics = await getPictures(0, false);
      const fetchedTags = await getFilteredTags([]);
      setAllPictures(fetchedPics);
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchAllPictures();
  }, [fetchAllPictures]);

  const keyDownHandler = useCallback((event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "enter") {
      event.preventDefault();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
          <div className="gallery__spinnerText">loading</div>
        </div>
      ) : (
        <Fragment>
          {pictureSelected && (
            <EditDrawer
              picture={pictureSelected}
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
            />
          )}
          <div className="picAdmin__headerBackground">
            <div className="picAdmin__tagSelector">
              <Select
                className={
                  adultContentSelected && "picAdmin__tagSelectorDeactivated"
                }
                showSearch={true}
                allowClear={true}
                style={{ width: "100%" }}
                placeholder="Select a tag to manage"
                disabled={adultContentSelected}
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
            {tagSelected ? (
              <div className="picAdmin__adultContentFlag">
                Only matching pictures&nbsp;&nbsp;&nbsp;
                <Switch
                  size="small"
                  defaultChecked={showOnlyMatchingPictures}
                  onChange={() =>
                    setShowOnlyMatchingPictures(!showOnlyMatchingPictures)
                  }
                />
              </div>
            ) : (
              <div className="picAdmin__adultContentFlag">
                &nbsp;
                <span
                  style={
                    adultContentSelected ? { opacity: ".1" } : { opacity: ".3" }
                  }
                >
                  or edit the{" "}
                </span>
                &nbsp;
                <i>Adult-content</i> flag &nbsp;
                <Switch
                  size="small"
                  defaultChecked={adultContentSelected}
                  onChange={() =>
                    setAdultContentSelected(!adultContentSelected)
                  }
                />
              </div>
            )}
          </div>
          <div className="picAdmin__main">
            {allPictures.map((picture) => {
              if (
                showOnlyMatchingPictures &&
                !picture.tags.includes(tagSelected)
              ) {
                return null;
              }
              return (
                <div className="picAdmin__picture">
                  <PicThumbAdmin
                    picture={picture}
                    tagSelected={tagSelected}
                    adultContentSelected={adultContentSelected}
                    setShowDrawer={setShowDrawer}
                    setPictureSelected={setPictureSelected}
                    fetchAllPictures={fetchAllPictures}
                  />
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
