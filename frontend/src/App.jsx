import React, { Fragment, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { Gallery } from "./pages/Gallery/Gallery";
import { Uploader } from "./pages/Uploader/Uploader";
import { userStore } from "./store/userStore";
import { authStore } from "./store/authStore";
import { Login } from "./component/Login/Login";

import "./helpers/axiosInterceptor";
import "./App.css";

const App = observer(() => {
  const checkForValidAuth = useCallback(async () => {
    if (authStore.refreshToken !== null) {
      await authStore.getNewToken();
      await userStore.fetchuserData();
    }
  }, []);

  useEffect(() => {
    checkForValidAuth();
  }, [checkForValidAuth]);

  return (
    <Router>
      <div className="App">
        <div className="App__main">
          <Switch>
            <Route path="/admin">
              <Uploader />
            </Route>
            <Route path="/">
              <div className="App__flex">
                {authStore.hasAccess ? (
                  <Gallery />
                ) : (
                  <Fragment>
                    <div className="App__title">&nbsp;kinkograph</div>
                    <Login />
                    <div className="spacer"></div>
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
