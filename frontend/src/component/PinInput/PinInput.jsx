import { React } from "react";
import "./PinInput.css";

export const PinInput = (props) => {
  const inputHandler = (e) => {
    const nextInput = parseInt(e.target.id, 10) + 1;
    if (nextInput < 7) {
      document.getElementById(e.target.id).blur();
      document.getElementById(nextInput).value = "";
      document.getElementById(nextInput).focus();
    } else {
      document.getElementById(1).focus();
      const code =
        document.getElementById(1).value +
        document.getElementById(2).value +
        document.getElementById(3).value +
        document.getElementById(4).value +
        document.getElementById(5).value +
        document.getElementById(6).value;
      document.getElementById(1).value = "";
      document.getElementById(2).value = "";
      document.getElementById(3).value = "";
      document.getElementById(4).value = "";
      document.getElementById(5).value = "";
      document.getElementById(6).value = "";
      props.login(code);
    }
  };

  const clickHandler = (e) => {
    const inputID = parseInt(e.target.id, 10);
    let lastInputWithData = 6;
    if (document.getElementById(1).value === "") {
      lastInputWithData = 1;
    } else if (document.getElementById(2).value === "") {
      lastInputWithData = 2;
    } else if (document.getElementById(3).value === "") {
      lastInputWithData = 3;
    } else if (document.getElementById(4).value === "") {
      lastInputWithData = 4;
    } else if (document.getElementById(5).value === "") {
      lastInputWithData = 5;
    } else if (document.getElementById(6).value === "") {
      lastInputWithData = 6;
    }
    document.getElementById(inputID).blur();
    document.getElementById(lastInputWithData).focus();
  };

  return (
    <div>
      <form>
        <input
          id="1"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          style={{ marginLeft: "20px" }}
          autoComplete="new-password"
        />
        <input
          id="2"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          onClick={clickHandler}
          autoComplete="new-password"
        />
        <input
          id="3"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          onClick={clickHandler}
          autoComplete="new-password"
        />
        <input
          id="4"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          onClick={clickHandler}
          autoComplete="new-password"
        />
        <input
          id="5"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          onClick={clickHandler}
          autoComplete="new-password"
        />
        <input
          id="6"
          className="PinInput__input"
          placeholder="_"
          maxLength="1"
          min="1"
          max="1"
          onChange={inputHandler}
          onClick={clickHandler}
          style={{ width: "40px" }}
          autoComplete="new-password"
        />
      </form>
    </div>
  );
};
