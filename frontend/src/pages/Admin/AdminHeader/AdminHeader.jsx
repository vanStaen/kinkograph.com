import React, { useState } from "react";

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
          UPLOAD
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "pic" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("pic")}
      >
        <div className="adminHeader__elementTitle">
          PICTURES
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "tag" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("tag")}
      >
        <div className="adminHeader__elementTitle">
          TAGS
        </div>
      </div>
      <div
        className={`adminHeader__element ${selected === "user" && `adminHeader__elementSelected`
          }`}
        onClick={() => clickHandler("user")}
      >
        <div className="adminHeader__elementTitle">
          USERS
        </div>
      </div>
    </div>
  );
};
