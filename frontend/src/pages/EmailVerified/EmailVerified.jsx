import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { postEmailVerified } from "./postEmailVerified";
import { LanguageDropDown } from "../../component/LanguageDropDown/LanguageDropDown";

import "./EmailVerified.css";

export const EmailVerified = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { t } = useTranslation();
  const params = useParams();

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
    }
    setIsLoading(false);
  }, [params.verifyCode]);

  useEffect(() => {
    emailIsVerified();
  }, [emailIsVerified]);

  return (
    <div>
      <div className="emailVerified__container">
        <LanguageDropDown />
        {isLoading ? (
          <LoadingOutlined className="emailVerified__loader" />
        ) : isVerified ? (
          <div className="emailVerified__paragraph">
            <span>
              <strong>{t("login.emailVerified")}</strong> <br />
              {t("login.welcomeInOurCommunity")}!<br />
              {t("login.goAheadAndLogin")}.
            </span>
            <br />
            <br />
            <div className="emailVerified__link">
              <span>{t("login.redirectedToThe")} </span>
              <strong>
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {" "}
                  {t("login.loginPage")}.
                </span>
              </strong>
              .
            </div>
          </div>
        ) : (
          <div className="emailVerified__paragraph">
            <span>
              <strong>{t("login.emailNotVerified")}!</strong>
            </span>
            <br />
            <span>{t("login.somethingWrongEmail")}!</span>
            <br />
            <div className="emailVerified__link">
              <span>{t("login.whatCanYouDo")} </span>
              <strong>
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {t("login.loginPage")}
                </span>
              </strong>
              <span>
                {", "}
                {t("login.requestNewLink")}.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
