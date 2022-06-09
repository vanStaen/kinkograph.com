import React from "react";
import { observer } from "mobx-react";

import { GalleryHeaderRight } from "./GalleryHeaderRight";
import { GalleryHeaderLeft } from "./GalleryHeaderLeft";
import { GalleryHeaderFilter } from "./GalleryHeaderFilter";

import "./GalleryHeader.css";

export const GalleryHeader = observer(() => {
  return (
    <div className="galleryHeader__main">
      <GalleryHeaderLeft />
      <GalleryHeaderFilter />
      <GalleryHeaderRight />
    </div>
  );
});
