import axios from "axios";
import { authStore } from "../store/authStore";

axios.interceptors.request.use(
  async (config) => {
    //console.log(`${config.method} ${config.url}`);
    try {
      const token = authStore.token ?
        await authStore.token :
        await authStore.getNewToken();
      // console.log("Request send with token:", token);
      if (token) {
        config.headers = Object.assign({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        });
      }
    }
    catch (err) { console.log(err); }
    return config;
  },
  (error) => {
    console.log("Interceptor Error", error);
    return Promise.reject(error);
  }
);