import React from "react";
import { useTranslation } from "react-i18next";

export const AlreadyMember = (props) => {
  const { t } = useTranslation();

  return (
    <div classname="login__alreadyMember" style={{ paddingTop: "15px" }}>
      {!props.showSignUp ? (
        <>
          {t("login.newHere")}? &nbsp;
          <span
            className="link"
            onClick={() => props.setShowSignUp(!props.showSignUp)}
          >
            {t("login.signUp")}
          </span>
        </>
      ) : (
        <>
          {t("login.member")}? &nbsp;
          <span
            className="link"
            onClick={() => props.setShowSignUp(!props.showSignUp)}
          >
            {t("login.login")}
          </span>
        </>
      )}
    </div>
  );
};
