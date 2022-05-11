import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./calls/getUserInfo";
import { favoriteStore } from "./favoriteStore";

export class UserStore {
  email = null;
  firstname = null;
  lastname = null;
  username = null;
  avatar = null;
  isAdmin = false;
  language = null;
  lastLogin = null; //last_login
  numberOfPicAtLastLogin = null; //nb_picture_at_last_login

  constructor() {
    makeObservable(this, {
      fetchUserData: action,
      email: observable,
      setEmail: action,
      firstname: observable,
      setFirstname: action,
      lastname: observable,
      setLastname: action,
      username: observable,
      setUsername: action,
      avatar: observable,
      setAvatar: action,
      language: observable,
      setLanguage: action,
      lastLogin: observable,
      setLastLogin: action,
      numberOfPicAtLastLogin: observable,
      setNumberOfPicAtLastLogin: action,
      isAdmin: observable,
      setIsAdmin: action,
    });
  }

  setEmail = (email) => {
    this.email = email;
  };

  setFirstname = (firstname) => {
    this.firstname = firstname;
  };

  setLastname = (lastname) => {
    this.lastname = lastname;
  };

  setUsername = (username) => {
    this.username = username;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setLanguage = (language) => {
    this.language = language;
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

  fetchUserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      //console.log("userData", userData);
      userStore.setEmail(userData.email);
      userStore.setFirstname(userData.firstname);
      userStore.setLastname(userData.lastname);
      userStore.setUsername(userData.username);
      userStore.setAvatar(userData.avatar);
      userStore.setLastLogin(userData.last_login);
      if (userData.favorites) {
        favoriteStore.setFavoritesId(userData.favorites);
      }
      if (userData.is_admin) {
        userStore.setIsAdmin(userData.is_admin);
      }
    }
  };
}

export const userStore = new UserStore();
