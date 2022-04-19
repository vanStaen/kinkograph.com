import React, { Fragment, useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { QuestionOutlined } from "@ant-design/icons";

import { Gallery } from "./pages/Gallery/Gallery";
import { GalleryOverlaySimple } from "./component/GalleryOverlay/GalleryOverlaySimple";
import { Info } from "./pages/Info/Info";
import { Admin } from "./pages/Admin/Admin";
import { authStore } from "./store/authStore";
import { Login } from "./component/Login/Login";

import "./App.css";

const defineVariableHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  useLayoutEffect(() => {
    // Define variable height
    defineVariableHeight();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="App__main">
          <Switch>
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
                    <Login />
                    <div className="spacer"></div>
                    <Link className="App__infoLink" to="info">
                      <QuestionOutlined />
                    </Link>
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
