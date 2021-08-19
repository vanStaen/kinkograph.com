import React, { useState, useEffect, useCallback, Fragment } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { getPictures } from "../../../store/calls/getPictures";
import { EditDrawer } from "../Uploader/EditDrawer/EditDrawer";
import "./PicAdmin.css";

export const PicAdmin = () => {
  const [isLoading, setIsloading] = useState(true);
  const [allPictures, setAllPictures] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pictureSelected, setPictureSelected] = useState(null);

  const fetchAllPictures = useCallback(async () => {
    try {
      const fetchedPics = await getPictures(0, true);
      setAllPictures(fetchedPics);
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
        <div className="picAdmin__main">
          {allPictures.map((picture) => {
            return (
              <img
                id={`pic_${picture.id}`}
                src={picture.url_thumb}
                alt={picture.id}
                key={picture.id}
                onClick={() => pictureClickHandle(picture)}
              />
            );
          })}
        </div>
      )}
    </Fragment>
  );
};
