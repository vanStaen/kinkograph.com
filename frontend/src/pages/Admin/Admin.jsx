import React, { useState } from "react";
import { observer } from "mobx-react";

import { userStore } from "../../store/userStore";
import { Uploader } from "./Uploader/Uploader";
import { AdminHeader } from "./AdminHeader/AdminHeader";
import { UserAdmin } from "./UserAdmin/UserAdmin";
import { TagAdmin } from "./TagAdmin/TagAdmin";
import { PicAdmin } from "./PicAdmin/PicAdmin";

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
  ) : (
    <div className="Uploader__noAccess">
      Restricted!
      <br />
      <br />
      <br />
    </div>
  );
});
