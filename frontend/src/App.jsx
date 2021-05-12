import React, { useState } from "react";
import { PinInput } from "./component/PinInput/PinInput";
import { Gallery } from "./pages/Gallery/Gallery";
import "./App.css";

const App = () => {
  const [access, setAccess] = useState(false);
  const login = (code) => {
    console.log(code);
    setAccess(true);
  };

  return (
    <div className="App">
      <div className="App__main">
        {access ? (
          <Gallery />
        ) : (
          <>
            <div className="spacer"></div>
            <div className="App__title">&nbsp;kinkograph</div>
            <PinInput login={login} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
