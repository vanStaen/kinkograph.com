import React, { useState, useEffect, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { getUsers } from "./getUsers";
import { UserInfos } from "./UserInfos/UserInfos";

import "./UserAdmin.css";

export const UserAdmin = () => {
  const [isLoading, setisLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUser = useCallback(async () => {
    const allUsers = await getUsers();
    setAllUsers(allUsers);
    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  return isLoading ? (
    <div className="App__flex">
      <LoadingOutlined className="Gallery__spinner" />
      <div className="gallery__spinnerText">loading</div>
    </div>
  ) : (
    <div className="userAdmin__main">
      {allUsers.map((user) => {
        return <UserInfos user={user} />;
      })}
    </div>
  );
};
