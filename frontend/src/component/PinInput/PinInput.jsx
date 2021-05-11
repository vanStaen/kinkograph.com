import { React, useCallback, useEffect, useState } from "react";
import "./PinInput.css";

export const PinInput = (props) => {
  const [lastFiledInput, setLastFiledInput] = useState(1);

  const keyDownListener = useCallback((event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "backspace") {
      if (lastFiledInput > 1) {
        document.getElementById(lastFiledInput - 1).value = "";
        setLastFiledInput(lastFiledInput - 1);
      }
    } else if (keyPressed.length > 1) {
      // console.log(keyPressed);
    } else {
      document.getElementById(lastFiledInput).value = keyPressed;
      setLastFiledInput(lastFiledInput + 1);
      if (lastFiledInput + 1 === 7) {
        setLastFiledInput(1);
        const code =
          document.getElementById(1).value +
          document.getElementById(2).value +
          document.getElementById(3).value +
          document.getElementById(4).value +
          document.getElementById(5).value +
          document.getElementById(6).value;
        setTimeout(() => {
          document.getElementById(1).focus();
          document.getElementById(1).value = "";
          document.getElementById(2).value = "";
          document.getElementById(3).value = "";
          document.getElementById(4).value = "";
          document.getElementById(5).value = "";
          document.getElementById(6).value = "";
          setLastFiledInput(1);
        }, 1000);
        props.login(code);
      }
    }
  });

  const clickHandler = (e) => {
    const inputID = parseInt(e.target.id, 10);
    let lastInputWithData = lastFiledInput;
    if (document.getElementById(1).value === "") {
      lastInputWithData = 1;
      setLastFiledInput(lastInputWithData);
    } else if (document.getElementById(2).value === "") {
      lastInputWithData = 2;
      setLastFiledInput(lastInputWithData);
    } else if (document.getElementById(3).value === "") {
      lastInputWithData = 3;
      setLastFiledInput(lastInputWithData);
    } else if (document.getElementById(4).value === "") {
      lastInputWithData = 4;
      setLastFiledInput(lastInputWithData);
    } else if (document.getElementById(5).value === "") {
      lastInputWithData = 5;
      setLastFiledInput(lastInputWithData);
    } else if (document.getElementById(6).value === "") {
      lastInputWithData = 6;
      setLastFiledInput(lastInputWithData);
    }
    document.getElementById(inputID).blur();
    document.getElementById(lastInputWithData).focus();
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

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
          onClick={clickHandler}
          style={{ width: "40px" }}
          autoComplete="new-password"
        />
      </form>
    </div>
  );
};
