import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./calls/deleteLogout";

export class AuthStore {
  token = null;
  refreshToken = localStorage.getItem("refreshToken") || null;
  isGuest = true;
  hasAccess = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      setToken: action,
      refreshToken: observable,
      setRefreshToken: action,
      logout: action, 
      isGuest: observable,
      setIsGuest: action,
      hasAccess: observable,
      setHasAccess: action,
    });
  }

  setToken = (token) => {
    this.token = token;
  };

  setRefreshToken = (refreshToken) => {
    this.refreshToken = refreshToken;    
    localStorage.setItem("refreshToken", refreshToken);
  };

  logout = async () => {
        // Delete refreshtoken from localstorage,
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.clear();
        authStore.setToken(null);
        authStore.setRefreshToken(null);
        await deleteLogout();
  }

  setIsGuest = (isGuest) => {
    this.isGuest = isGuest;
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };
  
}

export const authStore = new AuthStore();
 