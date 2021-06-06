import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { Drawer } from "antd";

import { favoriteStore } from "../../store/favoriteStore";

import "./FavoritesDrawer.css";

export const FavoritesDrawer = observer(() => {
  const hideDrawer = useCallback(() => {
    favoriteStore.setShowFavorites(false);
  }, []);

  return (
    <Drawer
      title={
        <span className="FavoritesDrawer__Title">
          Your {favoriteStore.favoritesId.length} favorite
          {favoriteStore.favoritesId.length > 1 && "s"}
        </span>
      }
      placement="left"
      closable={true}
      onClose={() => hideDrawer(false)}
      visible={favoriteStore.showFavorites}
      width="50%"
    >
      {/*<div className="FavoritesDrawer__font">favorites:</div>*/}
      {favoriteStore.favoriteObjectLoading ? (
        <div> Loading... </div>
      ) : (
        <div>
          {favoriteStore.favoriteObject.map((e) => {
            return (
              <div className="FavoritesDrawer__pictureContainer">
                #{e.id}
                <img
                  className="FavoritesDrawer__picture"
                  src={e.url_med}
                  alt={e.id}
                  key={e.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </Drawer>
  );
});
