import React from "react";

import { Uploader } from "../../component/Uploader/Uploader";
import { AdminHeader } from "./AdminHeader/AdminHeader";

export const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <Uploader />
    </div>
  );
};
