import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postEmailExist } from "./postEmailExist";
import { postSendRecoverLink } from "./postSendRecoverLink";

import "./PasswordRecover.css";

export const PasswordRecover = (props) => {
  const [emailDoNotExist, setEmailDoNotExist] = useState(undefined);
  const { t } = useTranslation();

  const changeEmailHandler = async (e) => {
    setEmailDoNotExist(undefined);
  };

  const submitHandler = async (values) => {
    const email = values.email.toLowerCase();
    const emailExist = await postEmailExist(email);
    if (emailExist === false) {
      setEmailDoNotExist("error");
    } else {
      setEmailDoNotExist("success");
      try {
        await postSendRecoverLink(email);
        notification.success({
          message: t("login.recoverEmailSent"),
          placement: "topLeft",
          className: "login__notification",
        });
        props.setIsRecovery(false);
      } catch (error) {
        notification.warn({
          message: error.message,
          placement: "topLeft",
          className: "login__notification",
        });
      }
    }
  };

  return (
    <div className="recover__full">
      <Form
        name="form_recover"
        className="recover__form"
        initialValues={{
          email: props.email,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          onChange={changeEmailHandler}
          rules={[
            {
              type: "email",
              required: true,
              message: t("login.pleaseInputEmail"),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="recover__formbutton"
            disabled={emailDoNotExist === "error" ? true : false}
          >
            {emailDoNotExist === "error"
              ? t("login.emailDoesNotExist")
              : t("login.sendPasswortResetEmail")}
          </Button>

          <div
            className="recover__iRemember"
            onClick={() => {
              props.setIsRecovery(false);
            }}
          >
            <ArrowLeftOutlined />{" "}
            <span className="link">{t("login.iRememberNow")}</span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
