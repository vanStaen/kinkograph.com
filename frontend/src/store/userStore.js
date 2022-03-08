import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./calls/getUserInfo";
import { favoriteStore } from "./favoriteStore";

export class UserStore {
  email = null;
  infos = null;
  name = "there";
  username = null;
  isAdmin = false;
  lastLogin = null; //last_login
  numberOfPicAtLastLogin = null; //nb_picture_at_last_login

  constructor() {
    makeObservable(this, {
      fetchuserData: action,
      setEmail: action,
      email: observable,
      setInfos: action,
      infos: observable,
      setName: action,
      name: observable,
      setUsername: action,
      lastLogin: observable,
      setLastLogin: action,
      numberOfPicAtLastLogin: observable,
      setNumberOfPicAtLastLogin: action, 
      username: observable,
      isAdmin: observable,
      setIsAdmin: action,
    });
  }

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

  setLastLogin = (lastLogin) => {
    this.lastLogin = lastLogin;
  };

  setNumberOfPicAtLastLogin = (numberOfPicAtLastLogin) => {
    this.numberOfPicAtLastLogin = numberOfPicAtLastLogin;
  };

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      userStore.setEmail(userData.email);
      userStore.setInfos(userData.infos);
      userStore.setName(userData.name);
      userStore.setUsername(userData.last_login);
      userStore.setLastLogin(userData.nb_picture_at_last_login);
      userStore.setNumberOfPicAtLastLogin(userData.username);
      if (userData.favorites) {
        favoriteStore.setFavoritesId(JSON.parse(userData.favorites));
      }
      if (userData.is_admin) {
        userStore.setIsAdmin(userData.is_admin);
      }
    }
  };
}

export const userStore = new UserStore();
