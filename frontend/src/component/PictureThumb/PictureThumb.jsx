import React, { Fragment } from "react";
import { FullscreenOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";

import { pictureStore } from "../../store/pictureStore";
import { authStore } from "../../store/authStore";
import { favoriteStore } from "../../store/favoriteStore";

import "./PictureThumb.css";

export const PictureThumb = observer((props) => {
  const isFavorite = favoriteStore.favoritesId.findIndex(
    (id) => id === props.picture.id
  );

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
    const index = pictureStore.allPictures.findIndex(
      (pic) => pic.id === props.picture.id
    );
    pictureStore.setSelected(index);
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
          className={`picture 
          ${!props.picture.tags ? "picture__gray" : ""} 
          ${props.picture.adult_content && authStore.isGuest ? "picture__blur" : ""} 
          ${isFavorite >= 0 ? "halo" : ""} `}
          src={props.picture.url_thumb}
          alt={props.picture.id}
          key={props.picture.id}
        />
        <div className="picture__tagMissing">
          {!props.picture.tags && "TAGS MISSING"}
        </div>
        <div id={`tag_${props.picture.id}`} className="picture__tagShow">
          {props.picture.adult_content && authStore.isGuest ?
            <>
              <EyeInvisibleOutlined />
              <div className="picture__adult">
                Adult content!</div>
              <div className="picture__adult">
                -</div>
              <div className="picture__adult">
                Please create an account </div>
              <div className="picture__adult">
                to see those.</div>
            </>
            :
            <>
              <FullscreenOutlined />
              <div className="picture__id">#{props.picture.id}</div>
            </>
          }

        </div>
      </div>
    </Fragment>
  );
});
