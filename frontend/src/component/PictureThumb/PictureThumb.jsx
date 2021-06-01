import React, { useState, Fragment } from "react";
import { EyeOutlined } from "@ant-design/icons";

import { EditDrawer } from "../EditDrawer/EditDrawer";
import "./PictureThumb.css";

export const PictureThumb = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Fragment>
      <EditDrawer
        picture={props.picture}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        reload={props.reload}
      />
      <div className="picture__container" onClick={() => setShowDrawer(true)}>
        <img
          className={`picture ${!props.picture.tags && "picture__bluryGray"}`}
          src={props.picture.url_thumb}
          alt={props.picture.id}
          key={props.picture.id}
        />
        <div className="picture__tagMissing">
          {!props.picture.tags && "TAGS MISSING"}
        </div>
        <div className="picture__eye">
          <EyeOutlined />
        </div>
      </div>
    </Fragment>
  );
};
