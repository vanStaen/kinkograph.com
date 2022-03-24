import React, { useState } from "react";

import { postLoginCode } from "../../store/calls/postLoginCode";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";
import { PinInput } from "../PinInput/PinInput";
import { LoginForm } from "./LoginForm";

import "./login.css";

export const Login = () => {
  const [loginWithCode, setLoginWithCode] = useState(true);
  const checkLogin = async (code) => {
    const res = await postLoginCode(code);
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

  return (
    <div>
      <div className="login__container">
        {loginWithCode ? (
          <PinInput login={checkLogin} />
        ) : (
          <div>
            <LoginForm />
          </div>
        )}
      </div>
      <div
        className="login__switchLoginType"
        onClick={() => {
          setLoginWithCode(!loginWithCode);
        }}
      >
        [{loginWithCode ? "log in with an account" : "log in with a code"}]
      </div>
    </div>
  );
};
