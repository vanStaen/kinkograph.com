import { action, makeObservable, observable } from "mobx";

export class UserStore {

  favorites = [];

  constructor() {
    makeObservable(this, {
      favorites: observable,
      addToFavorite: action,
      deleteFromFavorite: action,
    });
  }
  
  addToFavorite = (id) => {
    this.favorites.push(id);
  };
  
  deleteFromFavorite = (id) => {
    const index = this.favorites.findIndex((pictureId) => pictureId === id);
    this.favorites.splice(index, 1);
  };

}

export const userStore = new UserStore();
