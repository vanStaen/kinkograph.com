import React, { useState } from "react";
import { observer } from "mobx-react";
import { Avatar, Badge, Spin, Tooltip } from "antd";
import {
  LoadingOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import { userStore } from "../../../store/userStore";
import { authStore } from "../../../store/authStore";
import { favoriteStore } from "../../../store/favoriteStore";
import diaboliAvatar from "../../../img/diaboliAvatar.png";

import "./GalleryHeader.css";

export const GalleryHeaderRight = observer(() => {
  const [showOpenLock, setShowOpenLock] = useState(false);

  const handleClickLogOut = () => {
    authStore.logout();
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "goldenrod" }} spin />
  );

  return (
    <div className="galleryHeader__right">
      <span
        className="link galleryHeader__logout galleryHeader__logoutMobile"
        onMouseEnter={() => setShowOpenLock(true)}
        onMouseLeave={() => setShowOpenLock(false)}
        onClick={handleClickLogOut}
      >
        <Tooltip title="Logout">
          {showOpenLock ? (
            <UnlockOutlined style={{ position: "relative", bottom: "-2px" }} />
          ) : (
            <LockOutlined style={{ position: "relative", bottom: "-2px" }} />
          )}
        </Tooltip>
      </span>
      <span style={{ color: "rgba(255,255,255,.25)" }}> | </span>

      {userStore.isAdmin && (
        <>
          <span className="galleryHeader__logout galleryHeader__logoutMobile">
            <Tooltip title="Admin">
              <Link className="link" to="/admin/">
                <AppstoreAddOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              </Link>{" "}
            </Tooltip>
          </span>
          <span style={{ color: "rgba(255,255,255,.25)" }}> | </span>
        </>
      )}

      {!authStore.isGuest && (
        <span
          style={{ position: "relative", bottom: "5px" }}
          onClick={() => favoriteStore.setShowFavorites(true)}
          className="link"
        >
          <Tooltip title="Profil">
            <Badge count={userStore.isLoading ? 0 : 0} offset={[0, 5]}>
              <Avatar
                src={userStore.avatar ? userStore.avatar : diaboliAvatar}
                icon={userStore.isLoading && <Spin indicator={spinIcon} />}
                style={userStore.isLoading && { backgroundColor: "#000" }}
                size={40}
              />
            </Badge>
          </Tooltip>
        </span>
      )}
    </div>
  );
});
