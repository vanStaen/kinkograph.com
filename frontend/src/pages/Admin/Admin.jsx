import React, { useState } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";
import { Uploader } from "./Uploader/Uploader";
import { AdminHeader } from "./AdminHeader/AdminHeader";
import { UserAdmin } from "./UserAdmin/UserAdmin";
import { TagAdmin } from "./TagAdmin/TagAdmin";
import { PicAdmin } from "./PicAdmin/PicAdmin";

import './Admin.css';

export const Admin = observer(() => {
  const [display, setDisplay] = useState("upload");
  return userStore.isAdmin ? (
    <div>
      <AdminHeader setDisplay={setDisplay} />
      {display === "upload" && <Uploader />}
      {display === "tag" && <TagAdmin />}
      {display === "user" && <UserAdmin />}
      {display === "pic" && <PicAdmin />}
    </div>
  ) : authStore.hasAccess ? (
    <div className="admin__noAccess">
      You do not have admin rights.<br /><br /><br /><br /><br />
    </div>
  ) : (
        <div className="admin__noAccess">
          <Link className="link" to="/">
            You will need to connect first.
          </Link><br /><br /><br /><br /><br />
        </div >
      );
});
