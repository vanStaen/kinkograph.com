import React, { useState, useEffect, useCallback } from "react";
import { getFavoritesPictures } from "../../../../store/calls/getFavoritesPictures";
import "./UserInfos.css";

export const UserInfos = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    if (props.user.favorites) {
      const arrayFav = JSON.parse(props.user.favorites);
      const allFav = await getFavoritesPictures(arrayFav);
      setFavorites(allFav);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="userInfos__user" key={`user_${props.user.id}`}>
      <div className="titleFont">{props.user.name.toUpperCase()}</div>
      {favorites.length > 0 &&
        favorites.map((fav) => {
          return (
            <div className="userInfos__pictureContainer">
              <div className="smallFont"> #{fav.id}</div>
              <img
                className="userInfos__picture"
                src={fav.url_med}
                alt={fav.id}
                key={fav.id}
              />
            </div>
          );
        })}
    </div>
  );
};
