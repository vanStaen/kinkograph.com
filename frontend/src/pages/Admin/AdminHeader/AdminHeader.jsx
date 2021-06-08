import React from "react";

import "./AdminHeader.css";

export const AdminHeader = (props) => {
  const clickHandler = (target) => {
    props.setDisplay(target);
  };

  return (
    <div className="adminHeader__main">
      <div className="adminHeader__left" onClick={() => clickHandler("upload")}>
        UPLOAD
      </div>
      <div className="adminHeader__center" onClick={() => clickHandler("tag")}>
        TAGS
      </div>
      <div className="adminHeader__right" onClick={() => clickHandler("user")}>
        USER
      </div>
    </div>
  );
};
