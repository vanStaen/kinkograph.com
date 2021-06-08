import React from "react";
import { observer } from "mobx-react";

import "./AdminHeader.css";

export const AdminHeader = observer(() => {
  return (
    <div className="adminHeader__main">
      <div className="adminHeader__left">UPLOAD</div>
      <div className="adminHeader__center">TAGS</div>
      <div className="adminHeader__right">USER</div>
    </div>
  );
});
