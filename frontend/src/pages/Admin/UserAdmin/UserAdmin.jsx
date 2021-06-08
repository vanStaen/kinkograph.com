import React, { useState, useEffect, useCallback } from "react";

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
    <div className="userAdmin__main"> LOADING</div>
  ) : (
    <div className="userAdmin__main">
      {allUsers.map((user) => {
        return <UserInfos user={user} />;
      })}
    </div>
  );
};
