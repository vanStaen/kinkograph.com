import { action, makeObservable, observable } from "mobx";

import { getFavoritesPictures} from "./calls/getFavoritesPictures";
import { patchUserFavorites } from "./calls/patchUserFavorites";

export class FavoriteStore {
 
  favoritesId = [];
  favoriteObjectLoading = true;
  favoriteObject = [];
  showFavorites = false;

  constructor() {
    makeObservable(this, {
        favoriteObject: observable,
        setFavoriteObject: action,
        favoriteObjectLoading: observable,
        setFavoriteObjectLoading: action,
        fetchFavoriteObject: action,
        showFavorites: observable,
        setShowFavorites: action,
        favoritesId: observable,
        addToFavoritesId: action,
        setFavoritesId: action,
        deleteFromFavoritesId: action,
    });
  }

  fetchFavoriteObject = async () => {
    try { 
      if (favoriteStore.favoritesId.length > 0) {
        const fetchedFavoriteObject = await getFavoritesPictures(
            favoriteStore.favoritesId
        );
        favoriteStore.setFavoriteObject(fetchedFavoriteObject);
      }     
    } catch (err) {
      console.log(err);
    }
    favoriteStore.setFavoriteObjectLoading(false);
  };

  setFavoriteObject = (favoriteObject) => {
    this.favoriteObject = favoriteObject;
  };

  setFavoriteObjectLoading = (favoriteObjectLoading) => {
    this.favoriteObjectLoading = favoriteObjectLoading;
  };

  setShowFavorites = async (showFavorites) => {
    this.showFavorites = showFavorites;
    if (showFavorites) {
      favoriteStore.fetchFavoriteObject();
    }
  };  
  
  addToFavoritesId = (id) => {
    const index = this.favoritesId.findIndex((pictureId) => pictureId === id);
    if (index < 0) {
      this.favoritesId.push(id);
    }
    patchUserFavorites(this.favoritesId);
  };

  deleteFromFavoritesId = (id) => {
    const index = this.favoritesId.findIndex((pictureId) => pictureId === id);
    this.favoritesId.splice(index, 1);
    patchUserFavorites(this.favoritesId);
  };

  setFavoritesId = (favoritesId) => {
    this.favoritesId = favoritesId;
  };

}

export const favoriteStore = new FavoriteStore();
