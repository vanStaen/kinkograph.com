import React, { Fragment, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { EditDrawer } from "../../../component/EditDrawer/EditDrawer";

import "./EditPictures.css";

export const EditPictures = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const mouseHoverHandler = (hover) => {
    if (props.totalMissingTag) {
      setShowEdit(hover);
      const element = document.getElementById(props.picture.id);
      if (hover) {
        element.style.filter = "brightness(50%) blur(2px)";
      } else {
        element.style.filter = "brightness(100%) blur(0px)";
      }
    }
  };

  const clickHandler = () => {
    setTimeout(function () {
      props.setShowUploader(false);
    }, 300);
    setShowDrawer(true);
  };

  return (
    <Fragment>
      <EditDrawer
        picture={props.picture}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        reload={props.reload}
        setShowUploader={props.setShowUploader}
      />
      <div className="EditPictures__missingPicture">
        {props.totalMissingTag === null ? (
          showEdit && (
            <div
              className="EditPictures__missingPictureOverText"
              onMouseEnter={() => mouseHoverHandler(true)}
              onMouseLeave={() => mouseHoverHandler(false)}
              onClick={clickHandler}
            >
              <EditOutlined />
            </div>
          )
        ) : (
          <div className="EditPictures__missingPictureRest">
            +{props.totalMissingTag}
          </div>
        )}
        <img
          className={props.totalMissingTag && "EditPictures__bluryGray"}
          id={props.picture.id}
          src={props.picture.url_thumb}
          alt={props.picture.id}
          width={props.size}
          height={props.size}
          onMouseEnter={() => mouseHoverHandler(true)}
          onMouseLeave={() => mouseHoverHandler(false)}
          onClick={clickHandler}
        />
      </div>
    </Fragment>
  );
};
