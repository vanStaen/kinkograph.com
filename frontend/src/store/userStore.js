import { action, makeObservable, observable } from "mobx";

export class UserStore {
  user = { name: "there" };
  favorites = [];
  isGuest = true;
  hasAccess = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      favorites: observable,
      addToFavorite: action,
      deleteFromFavorite: action,
      isGuest: observable,
      setIsGuest: action,
      hasAccess: observable,
      setHasAccess: action,
    });
  }

  addToFavorite = (id) => {
    const index = this.favorites.findIndex((pictureId) => pictureId === id);
    if (index < 0) {
      this.favorites.push(id);
    }
  };

  deleteFromFavorite = (id) => {
    const index = this.favorites.findIndex((pictureId) => pictureId === id);
    this.favorites.splice(index, 1);
  };

  setIsGuest = (isGuest) => {
    this.isGuest = isGuest;
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };
}

export const userStore = new UserStore();
