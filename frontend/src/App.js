import {PinInput} from "./component/PinInput/PinInput"
import "./App.css";

function App() {
  return (
    <div className="App">
    <div className="App__main">
      <div className="App__title">&nbsp;kinkograph</div> 
      <PinInput/>
      <div className="spacer"></div> 
    </div>
    </div>
  );
}

export default App;