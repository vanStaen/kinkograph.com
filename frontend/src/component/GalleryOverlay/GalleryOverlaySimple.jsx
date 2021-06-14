import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  CloseOutlined,
  LoadingOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import { getSinglePicture } from "../../store/calls/getSinglePicture";

import "./GalleryOverlay.css";

export const GalleryOverlaySimple = (props) => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { key } = useParams();
  if (props.picKey) {
    key = props.picKey;
  }

  const [pic, setPic] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isFound, setIsFound] = useState(true);

  const fetchSinglePicture = useCallback(async () => {
    try {
      const res = await getSinglePicture(key);
      setPic(res);
    } catch (err) {
      setIsFound(false);
    }
    setIsloading(false);
  }, [key]);

  const copyLinkHandler = () => {
    const linkLogo = document.getElementById(`heart`);
    linkLogo.style.visibility = "visible";
    linkLogo.style.opacity = 0.25;
    linkLogo.style.fontSize = "50em";
    setTimeout(() => {
      linkLogo.style.visibility = "hidden";
      linkLogo.style.opacity = 0;
      linkLogo.style.fontSize = "1em";
    }, 500);
    const link = `http://kinkograph.com/${pic.key}`;
    navigator.clipboard.writeText(link).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    fetchSinglePicture();
  }, [fetchSinglePicture]);

  return isFound ? (
    <div className="overlay__overlay">
      <div
        className="overlay__background"
        onClick={() => {
          props.setShowSingleGallery(false);
        }}
      ></div>
      <div
        className="overlay__closeButton"
        id="closeButton"
        onClick={() => {
          props.setShowSingleGallery(false);
        }}
      >
        <CloseOutlined />
      </div>
      {isLoading ? (
        <LoadingOutlined className="overlay__spinner" />
      ) : (
        <div
          className="overlay__pictureContainer"
          onDoubleClick={copyLinkHandler}
        >
          <div className="overlay__infoAction">
            <div className="overlay__info">#{pic.id}</div>

            <div className="overlay__action">
              Doubleclick to copy link <LinkOutlined />
            </div>
          </div>
          <div className="overlay__pictureHover">
            <div className="overlay__pictureWatermark">KINKOGRAPH</div>
            <LinkOutlined id="heart" className="overlay__heart" />
          </div>
          <img
            className="overlay__picture"
            src={pic.url_med}
            alt={pic.id}
            key={`img__${pic.id}`}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="Uploader__noAccess">
      Picture not found!
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
