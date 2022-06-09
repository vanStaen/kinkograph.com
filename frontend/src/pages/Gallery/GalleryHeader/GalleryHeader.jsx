import React from "react";
import { observer } from "mobx-react";

import { GalleryHeaderRight } from "./GalleryHeaderRight";
import { GalleryHeaderLeft } from "./GalleryHeaderLeft";
import { GalleryHeaderCenter } from "./GalleryHeaderCenter";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  return (
    <div className="galleryHeader__main">
      <GalleryHeaderLeft />
      <GalleryHeaderCenter />
      <GalleryHeaderRight />
    </div>
  );
});
