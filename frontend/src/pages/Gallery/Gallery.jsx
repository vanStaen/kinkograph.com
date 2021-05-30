import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { PictureThumb } from "../../component/PictureThumb/PictureThumb";
import { getPictures } from "./getPictures";

import "./Gallery.css";

export const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);

  const fetchPictures = useCallback(async () => {
    try {
      const pictures = await getPictures(100);
      setPictures(pictures);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [getPictures]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <div>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
        </div>
      ) : (
        <div className="grid">
          {pictures.map((picture) => {
            return (
              <PictureThumb
                picture={picture}
                reload={fetchPictures}
                key={picture.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

/*
<div className="item item__landscape">item__landscape</div>
<div className="item item__square">item__square</div>
<div className="item item__portrait">item__portrait</div>
*/
