import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./LanguageDropDown.css";

export const LanguageDropDown = () => {
  const { i18n } = useTranslation();
  const initLanguage = i18n.language.slice(-2);
  const [language, setLanguage] = useState(
    initLanguage === "US" ? "EN" : initLanguage
  );

  const onLanguageChangeHandler = (value) => {
    if (value === "en") {
      i18n.changeLanguage("en-US");
      setLanguage("EN");
    } else if (value === "fr") {
      i18n.changeLanguage("fr-FR");
      setLanguage("FR");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
      setLanguage("DE");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          onLanguageChangeHandler("en");
        }}
      >
        <div className="languageDropdown__item">EN</div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          onLanguageChangeHandler("de");
        }}
      >
        <div className="languageDropdown__item">DE</div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          onLanguageChangeHandler("fr");
        }}
      >
        <div className="languageDropdown__item">FR</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="languageDropdown">
      <Dropdown overlay={menu} trigger={"click"}>
        {/* eslint-disable-next-line */}
        <a
          className="ant-dropdown-link"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {language}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
