import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import "./info.css";

export const Info = () => {
  return (
    <div className="Uploader__noAccess">
      <div className="info__title">&nbsp;kinkograph</div>
      <div className="info__paragraph">
        ... is a curated and organised collection of sex positive, erotic and/or
        BDSM artworks to inspire and plan an playful shoot between model and
        photographer. Use this to trigger your creativity.
      </div>
      <div className="info__paragraph">
        Due to the nature of the pictures, <b>you should be at least 18</b>{" "}
        years old to access this website.
      </div>
      <div className="info__paragraph">
        I do not share any of my private kinky picture here. Hence, many of the
        pictures found on this website are from the deep web. Should a picture
        ou own be foudn here, please{" "}
        <a className="info__contactLink" href="mailto:info@kinkograph.com">
          contact me
        </a>{" "}
        to decide what should be done.
      </div>
      <Link className="info__returnLink" to="/">
        <ArrowLeftOutlined />
      </Link>
      <div className="spacer"></div>
      <div className="spacer"></div>
    </div>
  );
};
