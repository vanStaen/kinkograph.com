import React, { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { Drawer } from "antd";

import { getFavoritesPictures } from "../../store/calls/getFavoritesPictures";
import { userStore } from "../../store/userStore";
import { pictureStore } from "../../store/pictureStore";

import "./FavoritesDrawer.css";

export const FavoritesDrawer = observer((props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    try {
      const fetchedFavorites = await getFavoritesPictures(
        JSON.parse(userStore.favorites)
      );
      setFavorites(fetchedFavorites);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const hideDrawer = useCallback(() => {
    pictureStore.setShowFavorites(false);
  }, [props]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <Drawer
      title={<span className="FavoritesDrawer__Title">Your Favorites</span>}
      placement="left"
      closable={true}
      onClose={() => hideDrawer(false)}
      visible={pictureStore.showFavorites}
      width="50%"
    >
      {/*<div className="FavoritesDrawer__font">favorites:</div>*/}
      {isLoading ? (
        <div> Loading... </div>
      ) : (
        favorites.map((e) => {
          return (
            <img
              className="FavoritesDrawer_picture"
              src={e.url_med}
              alt={e.id}
              key={e.id}
              style={{ maxWidth: "100%", maxHeight: window.innerHeight / 2.5 }}
            />
          );
        })
      )}
    </Drawer>
  );
});
