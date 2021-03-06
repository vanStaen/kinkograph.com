import React, { useLayoutEffect, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { Gallery } from "./pages/Gallery/Gallery";
import { GalleryOverlaySimple } from "./component/GalleryOverlay/GalleryOverlaySimple";
import { Info } from "./pages/Info/Info";
import { Admin } from "./pages/Admin/Admin";
import { authStore } from "./store/authStore";
import { userStore } from "./store/userStore";
import { Welcome } from "./pages/Welcome/Welcome";
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
  const { i18n } = useTranslation();

  useEffect(() => {
    authStore.checkAccess();
    userStore.fetchUserData();
  }, []);

  useEffect(() => {
    userStore.fetchUserData();
  }, [authStore.hasAccess]);

  useEffect(() => {
    if (userStore.language === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (userStore.language === "de") {
      i18n.changeLanguage("de-DE");
    } else {
      i18n.changeLanguage("en-US");
    }
  }, [userStore.language, i18n]);

  useLayoutEffect(() => {
    // Define variable height
    defineVariableHeight();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="App__main">
          <Switch>
            <Route path="/recoverpwd/:key" children={<NewPassword />} />
            <Route
              path="/emailverify/:verifyCode"
              children={<EmailVerified />}
            />
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/:key" children={<GalleryOverlaySimple />} />
            <Route path="/">
              <div className="App__flex">
                {authStore.hasAccess ? <Gallery /> : <Welcome />}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
});

export default App;
