import { action, makeObservable, observable } from "mobx";

export class UserStore {
  user = { name: "there" };
  favorites = [];

  constructor() {
    makeObservable(this, {
      user: observable,
      favorites: observable,
      addToFavorite: action,
      deleteFromFavorite: action,
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
}

export const userStore = new UserStore();
