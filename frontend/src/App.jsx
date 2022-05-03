import React, { Fragment, useLayoutEffect, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Gallery } from "./pages/Gallery/Gallery";
import { GalleryOverlaySimple } from "./component/GalleryOverlay/GalleryOverlaySimple";
import { Info } from "./pages/Info/Info";
import { Admin } from "./pages/Admin/Admin";
import { authStore } from "./store/authStore";
import { userStore } from "./store/userStore";
import { Login } from "./component/Login/Login";
import { FooterStartPage } from "./component/FooterStartPage/FooterStartPage";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { NewPassword } from "./pages/NewPassword/NewPassword";

import "../src/lib/i18n";
import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  const [loginWithCode, setLoginWithCode] = useState(true);

  const { i18n } = useTranslation();
  useLayoutEffect(() => {
    // Define variable height
    defineVariableHeight();
  }, []);

  useEffect(() => {
    if (userStore.language === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (userStore.language === "de") {
      i18n.changeLanguage("de-DE");
    } else {
      i18n.changeLanguage("en-US");
    }
  }, [i18n]);

  return (
    <Router>
      <div className="App">
        <div className="App__main">
          <Switch>
            <Route path="recoverpwd/:key" element={<NewPassword />} />
            <Route path="emailverify/:verifyCode" element={<EmailVerified />} />
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/:key" children={<GalleryOverlaySimple />} />
            <Route path="/">
              <div className="App__flex">
                {authStore.hasAccess ? (
                  <Gallery />
                ) : (
                  <Fragment>
                    <div className="App__title">&nbsp;kinkograph</div>
                    <Login loginWithCode={loginWithCode} />
                    <div className="spacer"></div>
                    <FooterStartPage
                      loginWithCode={loginWithCode}
                      setLoginWithCode={setLoginWithCode}
                    />
                  </Fragment>
                )}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
});

export default App;
