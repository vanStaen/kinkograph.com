import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";

import { PinInput } from "./component/PinInput/PinInput";
import { Gallery } from "./pages/Gallery/Gallery";
import { Uploader } from "./pages/Uploader/Uploader";
import { userStore } from "./store/userStore";
import { postLoginCode } from "./component/Login/postLoginCode";

import "./App.css";

const App = observer(() => {
  const login = async (code) => {
    const res = await postLoginCode(code);
    if (res.status === 200) {
      if (res.data.userId === "guest") {
        userStore.setIsGuest(true);
      } else {
        userStore.setIsGuest(false);
      }
      userStore.setHasAccess(true);
    }
  };

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
                {userStore.hasAccess ? (
                  <Gallery />
                ) : (
                  <Fragment>
                    <div className="App__title">&nbsp;kinkograph</div>
                    <PinInput login={login} />
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
