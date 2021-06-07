import axios from "axios";

import { authStore } from "../store/authStore";

axios.interceptors.request.use(
  async (config) => {
    //console.log(`${config.method} ${config.url}`);
    try {
      const token = authStore.token
      /* const token = authStore.token ?
        await authStore.token :
        await authStore.getNewToken(); */
      //console.log("Request send with token:", token);
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

/* axios.interceptors.response.use((response) => {
  //console.log('status', response.status);
  return response;
}, (error) => {
    const status = error.response ? error.response.status : null
    const originalRequest = error.config
    console.log(originalRequest);

  if (status === 401) {
    //console.log('error status', error.response.status);
    authStore.logout();
  } else {
        return Promise.reject(error);
    }
}); */