import { React } from "react";

import "./PinInput.css";

export const PinInput = (props) => {
  return (
    <div>
      <form autocomplete="off">
        <input
          className="PinInput__input"
          placeholder="______"
          id="myKadA"
          maxlength="6"
          min="6"
          max="6"
          required
        />
      </form>
    </div>
  );
};
