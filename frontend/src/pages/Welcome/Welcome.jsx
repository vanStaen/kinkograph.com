import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { CameraOutlined, FileImageOutlined } from "@ant-design/icons";

import { Login } from "../../component/Login/Login";
import { FooterStartPage } from "../../component/FooterStartPage/FooterStartPage";
import { LanguageDropDown } from "../../component/LanguageDropDown/LanguageDropDown";
import {
  getNewPicSinceDays,
  getTotalPictures,
} from "../../store/calls/getPictures";
import { getTagsCount } from "../../store/calls/getTags";

import "./Welcome.css";

const COUNT_PICTURE_SINCE_DAYS = 30;

export const Welcome = () => {
  const [loginWithCode, setLoginWithCode] = useState(false);

  const teaserNotifications = async () => {
    const numbNewPicSince30Days = await getNewPicSinceDays(
      COUNT_PICTURE_SINCE_DAYS
    );
    const totalPictures = await getTotalPictures();
    const totalTags = await getTagsCount();
    setTimeout(() => {
      notification.open({
        message: `${numbNewPicSince30Days} new pictures have been added in the last ${COUNT_PICTURE_SINCE_DAYS} days`,
        placement: "bottomLeft",
        className: "app__blackNotification",
        duration: 0,
        icon: <CameraOutlined style={{ color: "#666" }} />,
      });
    }, "3000");
    setTimeout(() => {
      notification.open({
        message: `A total of ${totalPictures} picture organised within ${totalTags} tags/keywords`,
        placement: "bottomLeft",
        className: "app__blackNotification",
        duration: 0,
        icon: <FileImageOutlined style={{ color: "#666" }} />,
      });
    }, "6000");
  };

  useEffect(() => {
    teaserNotifications().catch(console.error);
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
