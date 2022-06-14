import React, { useState } from "react";
import { CloudUploadOutlined, PictureOutlined, TagsOutlined, TeamOutlined } from '@ant-design/icons';

import "./AdminHeader.css";

export const AdminHeader = (props) => {
  const [selected, setSelected] = useState("upload");
  const clickHandler = (target) => {
    setSelected(target);
    props.setDisplay(target);
  };

  return (
    <div className="adminHeader__main">
      <div
        className={`adminHeader__element ${selected === "upload" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("upload")}
      >
        <div className="adminHeader__elementTitle">
          <CloudUploadOutlined />
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "pic" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("pic")}
      >
        <div className="adminHeader__elementTitle">
          <PictureOutlined />
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "tag" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("tag")}
      >
        <div className="adminHeader__elementTitle">
          <TagsOutlined />
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "user" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("user")}
      >
        <div className="adminHeader__elementTitle">
          <TeamOutlined />
        </div>
      </div>
    </div>
  );
};
