import React, { useState } from "react";

import { Uploader } from "./Uploader/Uploader";
import { AdminHeader } from "./AdminHeader/AdminHeader";
import { UserAdmin } from "./UserAdmin/UserAdmin";
import { TagAdmin } from "./TagAdmin/TagAdmin";
import { PicAdmin } from "./PicAdmin/PicAdmin";

export const Admin = () => {
  const [display, setDisplay] = useState("upload");
  return (
    <div>
      <AdminHeader setDisplay={setDisplay} />
      {display === "upload" && <Uploader />}
      {display === "tag" && <TagAdmin />}
      {display === "user" && <UserAdmin />}
      {display === "pic" && <PicAdmin />}
    </div>
  );
};
