import { action, makeObservable, observable } from "mobx";
import { getUserInfo } from "../component/Login/getUserInfo";

export class UserStore {
  favorites = [];
  isGuest = true;
  hasAccess = false;
  userId = null;
  email = null;
  infos = null;
  name = "there";
  username = null;

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
      userId: observable,
      setUserId: action,
      fetchuserData: action,
      setEmail: action,
      email: observable,
      setInfos: action,
      infos: observable,
      setName: action,
      name: observable,
      setUsername: action,
      username: observable,
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

  setUserId = (userId) => {
    this.userId = userId;
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

  fetchuserData = async () => {
    const userData = await getUserInfo();
    userStore.setEmail(userData.email);
    if (userData.favorites) {userStore.setFavorites(userData.favorites)};
    userStore.setInfos(userData.infos);
    userStore.setName(userData.name);
    userStore.setUsername(userData.username);
  };
}

export const userStore = new UserStore();
