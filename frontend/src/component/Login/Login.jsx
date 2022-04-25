import React, { useState } from "react";
import { notification } from "antd";

import { postLoginCode } from "../../store/calls/postLoginCode";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";
import { PinInput } from "../PinInput/PinInput";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { AlreadyMember } from "./AlreadyMember";

import "./login.css";

export const Login = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);

  const checkPin = async (code) => {
    try {
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
    } catch (err) {
      console.log(err);
      notification.error({
        message: err.message,
        placement: "topLeft",
        className: "login__notification",
      });
    }
  };

  return (
    <div>
      <div className="login__container">
        {props.loginWithCode ? (
          <PinInput login={checkPin} />
        ) : (
          <div>
            {showSignUp ? <SignUpForm /> : <LoginForm />}
            <div className="login__alreadyMember">
              <AlreadyMember
                setShowSignUp={setShowSignUp}
                showSignUp={showSignUp}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
