import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { PinInput } from "./component/PinInput/PinInput";
import { Gallery } from "./pages/Gallery/Gallery";
import { Uploader } from "./pages/Uploader/Uploader";

import "./App.css";

const App = () => {
  const [access, setAccess] = useState(false);
  const login = (code) => {
    if (code === "555666") {
      setAccess(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="App__main">

          <Switch>
            <Route path="/upload">
              <Uploader />
            </Route>
            <Route path="/">
              {access ? (
                <Gallery />
              ) : (
                  <div className="App__flex">
                    <div className="App__title">&nbsp;kinkograph</div>
                    <PinInput login={login} />
                    <div className="spacer"></div>
                  </div>
                )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
