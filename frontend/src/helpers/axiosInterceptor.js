import axios from "axios";

import { isTokenValid } from "./isTokenValid";
import { authStore } from "../store/authStore";

axios.interceptors.request.use(
  async (config) => {
    //console.log(`${config.method} ${config.url}`);
    try {
      let token;
      // Check for token validity. If no valid, get new one:
      if (isTokenValid(authStore.token)) {
        token = authStore.token;
      } else {
        console.log('Token is not Valid')
        if (authStore.token !== null) {
          // Token is not null, but not valid
          const newToken = await authStore.getNewToken();
          token = newToken;
        } else {
          // Token is empty
          token = null;
        }
      }
      //console.log("Request send with token:", token);
      if (token) {
        config.headers = Object.assign({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
      }
    } catch (err) {
      console.log(err);
    }
    return config;
  },
  (error) => {
    console.log("Interceptor Error", error);
    return Promise.reject(error);
  }
);
