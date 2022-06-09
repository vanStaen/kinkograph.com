import React from "react";
import { observer } from "mobx-react";
import "./GalleryHeader.css";

export const GalleryHeaderCenter = observer(() => {
  return (
    <div className="galleryHeader__center">
      <div className="galleryHeader__title">kinkograph</div>
    </div>
  );
});
