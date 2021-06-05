import { action, makeObservable, observable } from "mobx";
import { getUserInfo } from "./calls/getUserInfo";

export class UserStore {
  favorites = [];
  isGuest = true;
  hasAccess = false;
  email = null;
  infos = null;
  name = "there";
  username = null;
  isAdmin = false;

  constructor() {
    makeObservable(this, {
      favorites: observable,
      addToFavorites: action,
      setFavorites: action,
      deleteFromFavorites: action,
      isGuest: observable,
      setIsGuest: action,
      hasAccess: observable,
      setHasAccess: action,     
      fetchuserData: action,
      setEmail: action,
      email: observable,
      setInfos: action,
      infos: observable,
      setName: action,
      name: observable,
      setUsername: action,
      username: observable,
      isAdmin: observable,
      setIsAdmin: action,
    });
  }

  addToFavorites = (id) => {
    const index = this.favorites.findIndex((pictureId) => pictureId === id);
    if (index < 0) {
      this.favorites.push(id);
    }
  };

  deleteFromFavorites = (id) => {
    const index = this.favorites.findIndex((pictureId) => pictureId === id);
    this.favorites.splice(index, 1);
  };

  setIsGuest = (isGuest) => {
    this.isGuest = isGuest;
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };

  setEmail = (email) => {
    this.email = email;
  };

  setInfos = (infos) => {
    this.infos = infos;
  };

  setName = (name) => {
    this.name = name;
  };

  setUsername = (username) => {
    this.username = username;
  };

  setFavorites = (favorites) => {
    this.favorites = favorites;
  };

  setIsAdmin = (isAdmin) => {
    this.isAdmin = isAdmin;
  };

  fetchuserData = async () => {
    const userData = await getUserInfo();
    userStore.setEmail(userData.email);
    userStore.setInfos(userData.infos);
    userStore.setName(userData.name);
    userStore.setUsername(userData.username);
    if (userData.favorites) {
      userStore.setFavorites(userData.favorites);
    }
    if (userData.is_admin) {
      userStore.setIsAdmin(userData.is_admin);
    }
  };
}

export const userStore = new UserStore();
