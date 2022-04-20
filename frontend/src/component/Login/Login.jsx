import React, { useState } from "react";

import { postLoginCode } from "../../store/calls/postLoginCode";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";
import { PinInput } from "../PinInput/PinInput";
import { LoginForm } from "./LoginForm";

import "./login.css";

export const Login = (props) => {
  const checkLogin = async (code) => {
    const res = await postLoginCode(code);
    if (res.status === 200) {
      if (res.data.userId === "guest") {
        authStore.setIsGuest(true);
      } else {
        authStore.setIsGuest(false);
        userStore.fetchuserData();
      }
      authStore.setHasAccess(true);
    }
  };

  return (
    <div>
      <div className="login__container">
        {props.loginWithCode ? (
          <PinInput login={checkLogin} />
        ) : (
          <div>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
};
