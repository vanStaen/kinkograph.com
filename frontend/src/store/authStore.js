import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./calls/deleteLogout";
import { postLogin } from "./calls/postLogin";
import { getHasAccess } from "./calls/getHasAccess";
import { userStore } from "./userStore";

export class AuthStore {

  isGuest = false;
  hasAccess = false;

  constructor() {
    makeObservable(this, {
      login: action,
      logout: action,
      isGuest: observable,
      setIsGuest: action,
      hasAccess: observable,
      setHasAccess: action,
    });
  }

  login = async (email, username, password, remind) => {
    if (!remind) {
      remind = false;
    }
    // Call login endpoint
    const resultLogIn = await postLogin(email, username, password, remind);
    if (resultLogIn.result.access) {
      this.setHasAccess(true);
      userStore.setNumberOfPicAtLastLogin(resultLogIn.result.nb_picture_at_last_login);
    } else {
      return resultLogIn.result.error;
    }
  };

  logout = async () => {
    // Call logout endpoint
    await deleteLogout();
  };

  checkAccess = async () => {
    const resultCheckAccess = await getHasAccess();
    this.setHasAccess(resultCheckAccess.access);
  };

  setIsGuest = (isGuest) => {
    this.isGuest = isGuest;
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };
}

export const authStore = new AuthStore();
