import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./calls/getUserInfo";
import { favoriteStore } from "./favoriteStore";

export class UserStore {
  isGuest = true;
  hasAccess = false;
  email = null;
  infos = null;
  name = "there";
  username = null;
  isAdmin = false;

  constructor() {
    makeObservable(this, {
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
      favoriteStore.setFavoritesId(JSON.parse(userData.favorites));
    }
    if (userData.is_admin) {
      userStore.setIsAdmin(userData.is_admin);
    }
  };
}

export const userStore = new UserStore();
