import React, { useEffect, useState, useCallback, Fragment } from "react";

import { patchPicture } from "../../../store/calls/patchPicture";

import "./PicAdmin.css";

export const PicThumbAdmin = (props) => {
  const checkHasHalo = useCallback(() => {
    return props.picture.tags.includes(props.tagSelected);
  }, [props.picture.tags, props.tagSelected]);
  const [hasHalo, setHasHalo] = useState(checkHasHalo());

  const pictureClickHandle = async (picture) => {
    if (props.tagSelected) {
      const tagsArray = JSON.parse(picture.tags);
      const indexTag = tagsArray.findIndex((tag) => {
        return tag === props.tagSelected;
      });
      if (!hasHalo) {
        // Add Tag to array
        tagsArray.push(props.tagSelected);
        setHasHalo(true);
      } else {
        // Delete Tag from array
        tagsArray.splice(indexTag, 1);
        setHasHalo(false);
      }
      //Path picture
      await patchPicture(tagsArray, props.picture.id);
      props.fetchAllPictures();
    } else {
      props.setShowDrawer(true);
      props.setPictureSelected(picture);
    }
  };

  useEffect(() => {
    setHasHalo(checkHasHalo());
  }, [props.tagSelected, checkHasHalo]);

  return (
    <Fragment>
      <img
        className={
          props.tagSelected
            ? hasHalo
              ? "picAdmin__tagHalo"
              : "picAdmin__tagBlur"
            : "picAdmin__noFilter"
        }
        id={`pic_${props.picture.id}`}
        src={props.picture.url_thumb}
        alt={props.picture.id}
        key={props.picture.id}
        onClick={() => pictureClickHandle(props.picture)}
      />
      <span className="picAdmin__id">#{props.picture.id}</span>
    </Fragment>
  );
};
