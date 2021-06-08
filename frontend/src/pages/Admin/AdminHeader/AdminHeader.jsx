import React from "react";

import "./AdminHeader.css";

export const AdminHeader = (props) => {
  const clickHandler = (target) => {
    console.log("Click");
    props.setDisplay(target);
  };

  return (
    <div className="adminHeader__main">
      <div className="adminHeader__left" onClick={() => clickHandler("upload")}>
        <div className="pointer">UPLOAD</div>
      </div>
      <div className="adminHeader__center" onClick={() => clickHandler("tag")}>
        <div className="pointer">TAGS</div>
      </div>
      <div className="adminHeader__right" onClick={() => clickHandler("user")}>
        <div className="pointer">USER</div>
      </div>
    </div>
  );
};
