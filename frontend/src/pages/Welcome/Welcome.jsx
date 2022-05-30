import React, { useState } from "react";

import { Login } from "../../component/Login/Login";
import { FooterStartPage } from "../../component/FooterStartPage/FooterStartPage";
import { LanguageDropDown } from "../../component/LanguageDropDown/LanguageDropDown";

import "./Welcome.css";

export const Welcome = () => {
  const [loginWithCode, setLoginWithCode] = useState(false);

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
