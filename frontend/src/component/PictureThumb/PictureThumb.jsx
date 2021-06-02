import React, { Fragment } from "react";
import { FullscreenOutlined } from "@ant-design/icons";

import { pictureStore } from "../../store/pictureStore";
import "./PictureThumb.css";

export const PictureThumb = (props) => {
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

  const clickHandler = () => {
    pictureStore.setShowOverlay(true);
    pictureStore.setSelected(props.picture);
  };

  return (
    <Fragment>
      <div
        className="picture__container"
        onClick={clickHandler}
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
          <div className="picture__id">#{props.picture.id}</div>
        </div>
      </div>
    </Fragment>
  );
};
