import React from "react";

import { postLoginCode } from "../../store/calls/postLoginCode";
import { userStore } from "../../store/userStore";
import { PinInput } from "../PinInput/PinInput";

export const Login = () => {
  const checkLogin = async (code) => {
    const res = await postLoginCode(code);
    if (res.status === 200) {
      if (res.data.userId === "guest") {
        userStore.setIsGuest(true);
      } else {
        userStore.setIsGuest(false);
        userStore.fetchuserData();
      }
      userStore.setHasAccess(true);
    }
  };

  return <PinInput login={checkLogin} />;
};
