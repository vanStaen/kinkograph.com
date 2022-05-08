import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import {
  QuestionOutlined,
  UnlockOutlined,
  UserOutlined,
  BulbOutlined,
} from "@ant-design/icons";

import "./FooterStartPage.css";

export const FooterStartPage = (props) => {
  return (
    <>
      {props.loginWithCode && (
        <Tooltip title="Need an access code?">
          <Link
            className="startFooter__tipForCode"
            to={{ pathname: "https://www.youtube.com/watch?v=e-wl7f78aRI" }}
            target="_blank"
          >
            <BulbOutlined />
          </Link>
        </Tooltip>
      )}
      <div
        className="startFooter__switchLoginType"
        onClick={() => {
          props.setLoginWithCode(!props.loginWithCode);
        }}
      >
        <Tooltip title={props.loginWithCode ? "Use an account" : "Use a code"}>
          {props.loginWithCode ? <UserOutlined /> : <UnlockOutlined />}
        </Tooltip>
      </div>
      <Tooltip title="About">
        <Link className="startFooter__infoLink" to="info">
          <QuestionOutlined />
        </Link>
      </Tooltip>
    </>
  );
};
