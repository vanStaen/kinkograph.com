import React, { useState } from "react";
import { observer } from "mobx-react";
import { Tooltip } from "antd";
import {
  LockOutlined,
  UnlockOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { userStore } from "../../../store/userStore";
import { authStore } from "../../../store/authStore";

import "./GalleryHeader.css";

export const GalleryHeaderRight = observer(() => {
  const [showOpenLock, setShowOpenLock] = useState(false);

  const handleClickLogOut = () => {
    authStore.logout();
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="galleryHeader__right">
      <span
        className="galleryHeader__logout galleryHeader__logoutMobile"
        onMouseEnter={() => setShowOpenLock(true)}
        onMouseLeave={() => setShowOpenLock(false)}
        onClick={handleClickLogOut}
      >
        <Tooltip placement="bottomLeft" title="Logout">
          {showOpenLock ? <UnlockOutlined /> : <LockOutlined />}
        </Tooltip>
      </span>
      {userStore.isAdmin && (
        <>
          <span style={{ color: "rgba(255,255,255,.25)" }}> | </span>
          <span
            className="galleryHeader__logout galleryHeader__logoutMobile"
            onClick={handleClickLogOut}
          >
            <Link className="link" to="/admin/">
              <AppstoreAddOutlined />
            </Link>
          </span>
        </>
      )}
    </div>
  );
});
