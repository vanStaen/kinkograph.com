import React, { Fragment, useCallback } from "react";
import { observer } from "mobx-react";
import { Select, Tooltip } from "antd";

import { pictureStore } from "../../../store/pictureStore";
import { userStore } from "../../../store/userStore";
import { favoriteStore } from "../../../store/favoriteStore";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./AdminHeader.css";

export const AdminHeader = observer(() => {
  const { Option } = Select;

  return (
    <div className="adminHeader__main">
      <div className="adminHeader__left">UPLOAD</div>
      <div className="adminHeader__center">TAGS</div>
      <div className="adminHeader__right">USER</div>
    </div>
  );
});
