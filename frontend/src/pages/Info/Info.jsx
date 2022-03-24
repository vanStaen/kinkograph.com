import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import "./info.css";

export const Info = () => {
  return (
    <div className="info__container">
      <div className="info__title">&nbsp;kinkograph</div>
      <div className="info__paragraph">
        <span>
          ... is a curated and organised collection of sex positive, erotic
          and/or BDSM artworks to inspire and plan a playful shoot between
          model(s) and photographer. Use this to trigger your creativity.
        </span>
      </div>
      <div className="info__paragraph">
        <span>
          Due to the nature of the pictures,{" "}
          <span className="info__18">you should be at least 18</span> years old
          to access this website.
        </span>
      </div>
      <div className="info__paragraph">
        <span>
          I do not share any of my private kinky picture here. Thus, many of the
          pictures found on this website are from the deep web. Should a picture
          ou own be foudn here, please{" "}
          <a className="info__contactLink" href="mailto:info@kinkograph.com">
            contact me
          </a>{" "}
          to decide what should be done.
        </span>
      </div>
      <Link className="info__returnLink" to="/">
        <ArrowLeftOutlined />
      </Link>
      <div className="spacer"></div>
    </div>
  );
};
