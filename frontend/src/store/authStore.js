import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./calls/deleteLogout";
import { postLogin } from "./calls/postLogin";
import { getHasAccess } from "./calls/getHasAccess";

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
    if (resultLogIn.access) {
      this.setHasAccess(true);
      console.log(resultLogIn);
    } else {
      return resultLogIn.error;
    }
  };

  logout = async () => {
    // Call logout endpoint
    await deleteLogout();
  };

  checkAccess = async () => {
    const hasAccess = await getHasAccess();
    //console.log("Check if user has valid credentials.")
    this.setHasAccess(hasAccess);
  };

  setIsGuest = (isGuest) => {
    this.isGuest = isGuest;
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };
}

export const authStore = new AuthStore();
