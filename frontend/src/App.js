import {PinInput} from "./component/PinInput/PinInput"
import "./App.css";

function App() {

  const login = (code) => {
    console.log(code)
  }

  return (
    <div className="App">
    <div className="App__main">
      <div className="App__title">&nbsp;kinkograph</div> 
      <PinInput login={login}/>
      <div className="spacer"></div> 
    </div>
    </div>
  );
}

export default App;