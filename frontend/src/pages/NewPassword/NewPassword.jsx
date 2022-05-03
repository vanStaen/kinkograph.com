import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Button, notification } from "antd";
import { useParams } from "react-router-dom";
import { LockOutlined, SyncOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postTokenVerify } from "./postTokenVerify";
import { postChangePassword } from "./postChangePassword";

import "./NewPassword.css";

export const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();
  const params = useParams();

  const token = params.key;

  const submitHandler = async (value) => {
    setIsLoading(true);
    const password = value.password;
    try {
      const success = await postChangePassword(token, password);
      if (success === true) {
        notification.success({
          message: t("login.passwordReseted"),
          placement: "topLeft",
        });
        setTimeout(() => {
          document.location.href = "/";
        }, 3000);
      } else {
        notification.warn({
          message: t("login.passwordNotChanged"),
          placement: "topLeft",
        });
      }
    } catch (error) {
      notification.warn({
        message: error.message,
        placement: "topLeft",
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const verifyToken = useCallback(async () => {
    console.log("token", token);
    const tokenValid = await postTokenVerify(token);
    if (!tokenValid) {
      setIsValid(false);
      notification.error({
        message: t("login.linkNotValid"),
        placement: "topLeft",
        duration: 0,
      });
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <div className="App__flex">
      <div className="App__title newPassword__title">
        {t("login.setNewPassword")}
      </div>

      <Form
        name="form_signup"
        className="newPassword__form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputNewPassword"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.chooseNewPassword")}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("login.pleaseInputNewPassword"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("login.passwordDoNotMatch")));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.pleaseConfirmNewPassword")}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="newPassword__formbutton"
            disabled={!isValid}
          >
            {isLoading ? (
              <SyncOutlined spin />
            ) : isValid ? (
              t("login.updatePassword")
            ) : (
              t("login.linkNotValidAnymore")
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
