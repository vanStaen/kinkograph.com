import React, { useState, useEffect, useCallback } from "react";
import { Tooltip } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

import { getFavoritesPictures } from "../../../../store/calls/getFavoritesPictures";
import "./UserInfos.css";

export const UserInfos = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [showDetail, setShowDetail] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (props.user.favorites) {
      const allFav = await getFavoritesPictures(props.user.favorites);
      setFavorites(allFav);
    }
  }, [props.user.favorites]);

  const clickHandler = () => {
    const showDetailElement = document.getElementById(
      `userInfos__detail__${props.user.id}`
    );
    if (showDetail) {
      showDetailElement.style.display = "none";
    } else {
      showDetailElement.style.display = "block";
    }
    setShowDetail(!showDetail);
  };

  const pictureClickHandler = (key) => {
    props.setSinglePicKey(key);
    props.setShowSingleGallery(true);
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="userInfos__user" key={`user_${props.user.id}`}>
      <div className="userInfos__title" onClick={clickHandler}>
        <div className="userInfos__titleLeft">
          {props.user.last_login && (
            <Tooltip title={Date(props.user.last_login).toString()}>
              <HistoryOutlined className="userInfos__lastOnline" />
            </Tooltip>
          )}
          {props.user.firstname.toUpperCase()}
          <span className="smallFont">
            {props.user.access_code && ` ${props.user.access_code} `}
          </span>
        </div>
        <div className="userInfos__titleRight">
          <span style={{ color: "#555" }}>
            {props.user.email && ` ${props.user.email} `}
          </span>
          <span style={{ color: "#555" }}>
            {props.user.email && props.user.username && ` | `}
          </span>
          <span style={{ color: "#555" }}>
            {props.user.username && ` ${props.user.username} `}
          </span>
        </div>
      </div>
      <div
        className="userInfos__detail"
        id={`userInfos__detail__${props.user.id}`}
      >
        {favorites.length > 0
          ? favorites.map((fav) => {
              return (
                <div className="userInfos__pictureContainer">
                  <div className="smallFont"> #{fav.id}</div>
                  <img
                    className="userInfos__picture"
                    src={fav.url_med}
                    alt={fav.id}
                    key={fav.id}
                    onClick={() => pictureClickHandler(fav.key)}
                  />
                </div>
              );
            })
          : "nothing yet"}
      </div>
    </div>
  );
};
