import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Tooltip } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SyncOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postUsernameTaken } from "./postUsernameTaken";
import { postEmailTaken } from "./postEmailTaken";
import { postVerifyEmailLink } from "../Login/postVerifyEmailLink";
import { postAddUser } from "./postAddUser";

import "./SignUpForm.css";

export const SignUpForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsTaken, setEmailIsTaken] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
  const [errorMsgUsername, setErrorMsgUsername] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
  const { t, i18n } = useTranslation();
  const language = i18n.language.slice(0, 2);

  const changeUserNameHandler = async (e) => {
    const username = e.target.value;
    if (username === "") {
      setIsValidUsername("error");
      setErrorMsgUsername(null);
    } else {
      setIsValidUsername("validating");
      setErrorMsgUsername(null);
      const isUsernameTaken = await postUsernameTaken(username);
      if (isUsernameTaken === true) {
        setIsValidUsername("error");
        setErrorMsgUsername(t("login.usernameIsAlreadyTaken"));
      } else if (isUsernameTaken === false) {
        if (username.includes(" ")) {
          setIsValidUsername("error");
          setErrorMsgUsername(t("login.spacesinUsername"));
        } else {
          //eslint-disable-next-line
          const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (username.match(regexEmail)) {
            setIsValidUsername("error");
            setErrorMsgUsername(t("login.usernameShouldNotBeAnEmail"));
          } else {
            setIsValidUsername("success");
            setErrorMsgUsername(null);
          }
        }
      }
    }
  };

  const changeEmailHandler = async (e) => {
    const email = e.target.value;
    const isEmailTaken = await postEmailTaken(email);
    setEmailIsTaken(isEmailTaken);
    console.log("taken:", isEmailTaken);
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const username = values.username;
    const email = values.email.toLowerCase();
    const password = values.password;
    try {
      const response = await postAddUser(
        firstname,
        lastname,
        username,
        email,
        password,
        null,
        language
      );
      if (!response.errors) {
        await postVerifyEmailLink(email);
        notification.success({
          message: t("login.pleaseConfirmEmail"),
          placement: "topLeft",
          className: "app__blackNotification",
          duration: 0,
        });
        props.setShowSignUp(false);
      } else {
        notification.error({
          message: response.errors[0].message,
          placement: "topLeft",
          className: "app__blackNotification",
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "topLeft",
        className: "app__blackNotification",
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup__full">
      <Form
        name="form_signup"
        className="signup__form"
        onFinish={submitHandler}
      >
        <Form.Item
          name="firstname"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          rules={[
            {
              required: true,
              message: t("login.firstNameMissing"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("login.firstName")}
          />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            lineHeight: "32px",
            textAlign: "center",
          }}
        ></span>
        <Form.Item
          name="lastname"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          rules={[
            {
              required: true,
              message: t("login.lastNameMissing"),
            },
          ]}
        >
          <Input
            prefix={<SmileOutlined className="site-form-item-icon" />}
            placeholder={t("login.lastName")}
          />
        </Form.Item>

        <Tooltip
          title={
            errorMsgUsername
              ? errorMsgUsername === t("login.usernameIsAlreadyTaken")
                ? t("login.alreadyTaken")
                : t("login.doNotUseSpaces")
              : null
          }
          placement="left"
        >
          <Form.Item
            name="username"
            validateStatus={isValidUsername}
            onChange={changeUserNameHandler}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("login.howShouldWeCallYou"),
              },
              {
                validator(_, value) {
                  if (value && isValidUsername === "error") {
                    return Promise.reject(new Error(errorMsgUsername));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("login.pickUsername")}
            />
          </Form.Item>
        </Tooltip>
        <Tooltip
          title={emailIsTaken ? t("login.emailAlreadyInUse") : null}
          placement="left"
        >
          <Form.Item
            name="email"
            validateStatus={emailIsTaken ? "error" : "success"}
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
        </Tooltip>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputYourPassword"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.choosePassword")}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("login.pleaseConfirmYourPassword"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("login.passwordsDoNotMatch"))
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.confirmYourPassword")}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: t("login.pleaseConfirm18"),
            },
          ]}
        >
          <Checkbox className="signup__terms">{t("login.over18")} </Checkbox>
        </Form.Item>

        <Form.Item
          name="over18"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: t("login.pleaseAcceptTerms"),
            },
          ]}
        >
          <Checkbox className="signup__terms">
            {t("login.creatingAccountMeans")}{" "}
            <a className="link" href="/service">
              {t("login.termsService")}
            </a>
            ,{" "}
            <a className="link" href="/privacy">
              {t("login.privacyPolicy")}
            </a>
            {t("login.andDefault")}{" "}
            <a className="link" href="/settings">
              {t("login.notificationSettings")}
            </a>
            {t("login.creatingAccountMeansAfter")}
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup__formbutton"
          >
            {isLoading ? <SyncOutlined spin /> : t("login.createAccount")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
