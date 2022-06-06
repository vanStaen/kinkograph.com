import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { CameraOutlined, FileImageOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { Login } from "../../component/Login/Login";
import { FooterStartPage } from "../../component/FooterStartPage/FooterStartPage";
import { LanguageDropDown } from "../../component/LanguageDropDown/LanguageDropDown";
import {
  getNewPicSinceDays,
  getTotalPictures,
} from "../../store/calls/getPictures";
import { getTagsCount } from "../../store/calls/getTags";
import { authStore } from "../../store/authStore";
import { isMobileCheck } from "../../helpers/checkMobileTablet";

import "./Welcome.css";

const COUNT_PICTURE_SINCE_DAYS = 30;

export const Welcome = () => {
  const { t } = useTranslation();
  const [loginWithCode, setLoginWithCode] = useState(false);

  const teaserNotifications = async () => {
    const numbNewPicSince30Days = await getNewPicSinceDays(
      COUNT_PICTURE_SINCE_DAYS
    );
    const totalPictures = await getTotalPictures();
    const totalTags = await getTagsCount();

    if (numbNewPicSince30Days > 0) {
      setTimeout(() => {
        if (authStore.hasAccess === false) {
          notification.open({
            message: `${numbNewPicSince30Days} 
                    ${t("welcome.newPicturesAdded")} 
                    ${COUNT_PICTURE_SINCE_DAYS} 
                    ${t("welcome.days")}`,
            placement: "bottomLeft",
            className: "app__blackNotification",
            duration: 0,
            icon: <CameraOutlined style={{ color: "#666" }} />,
          });
        }
      }, "3000");
    }

    setTimeout(() => {
      if (authStore.hasAccess === false) {
        notification.open({
          message: `${t("welcome.aTotalOf")} 
                  ${totalPictures} 
                  ${t("welcome.picOrganisedWith")} 
                  ${totalTags} 
                  ${t("welcome.tagsKeywords")}`,
          placement: "bottomLeft",
          className: "app__blackNotification",
          duration: 0,
          icon: <FileImageOutlined style={{ color: "#666" }} />,
        });
      }
    }, "6000");
  };

  useEffect(() => {
    if (!isMobileCheck) {
      teaserNotifications().catch(console.error);
    }
  }, []);

  return (
    <div className="welcome__main ">
      <LanguageDropDown />
      <div className="welcome__container ">
        <div className="App__title">&nbsp;kinkograph</div>
        <Login loginWithCode={loginWithCode} />
      </div>
      <FooterStartPage
        loginWithCode={loginWithCode}
        setLoginWithCode={setLoginWithCode}
      />
    </div>
  );
};
