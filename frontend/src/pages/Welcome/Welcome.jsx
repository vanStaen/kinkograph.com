import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { CameraOutlined } from "@ant-design/icons";

import { Login } from "../../component/Login/Login";
import { FooterStartPage } from "../../component/FooterStartPage/FooterStartPage";
import { LanguageDropDown } from "../../component/LanguageDropDown/LanguageDropDown";

import "./Welcome.css";

export const Welcome = () => {
  const [loginWithCode, setLoginWithCode] = useState(false);

  /* useEffect(() => {
    setTimeout(() => {
      notification.open({
        message: `3 second notification`,
        placement: "bottomLeft",
        className: "app__blackNotification",
        duration: 5,
      });
    }, "3000");
    setTimeout(() => {
      notification.open({
        message: `6 second notification`,
        placement: "bottomLeft",
        className: "app__blackNotification",
        duration: 5,
      });
    }, "6000");
  }, []); */

  return (
    <div className="welcome__main ">
      <LanguageDropDown />
      <div className="welcome__container ">
        <div className="App__title">&nbsp;kinkograph</div>
        <Login loginWithCode={loginWithCode} />
      </div>
      <FooterStartPage
        loginWithCode={loginWithCode}
        setLoginWithCode={setLoginWithCode}
      />
    </div>
  );
};
