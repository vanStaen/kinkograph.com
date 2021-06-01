import React, { useState, Fragment } from "react";
import { FullscreenOutlined } from "@ant-design/icons";

import { EditDrawer } from "../EditDrawer/EditDrawer";
import "./PictureThumb.css";

export const PictureThumb = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const mouseHoverHandler = (hover) => {
    const element = document.getElementById(`tag_${props.picture.id}`);
    const picture = document.getElementById(`pic_${props.picture.id}`);
    if (hover) {
      element.style.visibility = "visible";
      element.style.opacity = 1;
      picture.style.filter = "brightness(50%) grayscale(1)";
    } else {
      element.style.visibility = "hidden";
      element.style.opacity = 0;
      picture.style.filter = "brightness(100%) grayscale(0)";
    }
  };

  return (
    <Fragment>
      <EditDrawer
        picture={props.picture}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        reload={props.reload}
      />
      <div
        className="picture__container"
        onClick={() => setShowDrawer(true)}
        onMouseEnter={() => mouseHoverHandler(true)}
        onMouseLeave={() => mouseHoverHandler(false)}
      >
        <img
          id={`pic_${props.picture.id}`}
          className={`picture ${!props.picture.tags && "picture__bluryGray"}`}
          src={props.picture.url_thumb}
          alt={props.picture.id}
          key={props.picture.id}
        />
        <div className="picture__tagMissing">
          {!props.picture.tags && "TAGS MISSING"}
        </div>
        <div id={`tag_${props.picture.id}`} className="picture__tagShow">
          <FullscreenOutlined />
        </div>
      </div>
    </Fragment>
  );
};
