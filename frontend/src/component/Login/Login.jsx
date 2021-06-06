import React from "react";

import { postLoginCode } from "../../store/calls/postLoginCode";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";
import { PinInput } from "../PinInput/PinInput";

export const Login = () => {
  const checkLogin = async (code) => {
    const res = await postLoginCode(code);
    console.log(res.data);
    if (res.status === 200) {
      if (res.data.userId === "guest") {
        authStore.setIsGuest(true);
      } else {
        authStore.setToken(res.data.token);
        authStore.setRefreshToken(res.data.refreshToken);
        authStore.setIsGuest(false);
        userStore.fetchuserData();
      }
      authStore.setHasAccess(true);
    }
  };

  return <PinInput login={checkLogin} />;
};
