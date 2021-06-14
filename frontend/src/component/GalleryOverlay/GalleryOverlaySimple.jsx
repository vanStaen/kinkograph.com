import React from "react";
import { useParams } from "react-router-dom";

export const GalleryOverlaySimple = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div className="Uploader__noAccess">
      Picture #{id} not found!
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
