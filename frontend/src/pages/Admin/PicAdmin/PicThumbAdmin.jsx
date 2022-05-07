import React, { useEffect, useState, useCallback, Fragment } from "react";

import { patchPicture } from "../../../store/calls/patchPicture";
import { patchPictureAdult } from "../../../store/calls/patchPictureAdult";

import "./PicAdmin.css";

export const PicThumbAdmin = (props) => {
  const checkHasHalo = useCallback(() => {
    let result = false;
    if (props.picture.tags) {
      result = props.picture.tags.includes(props.tagSelected);
    }
    return result;
  }, [props.picture, props.tagSelected]);

  const checkIsAdult = useCallback(() => {
    const result = props.picture.adult_content;
    if (result === true) {
      return true;
    }
    return false;
  }, [props.picture, props.adultContentSelected]);

  const [hasHalo, setHasHalo] = useState(checkHasHalo());
  const [isAdult, setIsAdult] = useState(checkIsAdult());

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
    } else if (props.adultContentSelected) {
      setIsAdult(!isAdult);
      await patchPictureAdult(!props.picture.adult_content, props.picture.id);
      props.fetchAllPictures();
    } else {
      props.setShowDrawer(true);
      props.setPictureSelected(picture);
    }
  };

  useEffect(() => {
    setHasHalo(checkHasHalo());
  }, [props.tagSelected, props.adultContentSelected, checkHasHalo]);

  return (
    <Fragment>
      <img
        className={
          props.tagSelected || props.adultContentSelected
            ? hasHalo
              ? "picAdmin__tagHalo"
              : isAdult
              ? "picAdmin__tagAdult"
              : "picAdmin__tagBlur"
            : "picAdmin__noFilter"
        }
        id={`pic_${props.picture.id}`}
        src={props.picture.url_thumb}
        alt={props.picture.id}
        key={props.picture.id}
        onClick={() => pictureClickHandle(props.picture)}
      />

      <span className="picAdmin__isAdult">
        {props.picture.adult_content && "+18"}
      </span>
      {props.picture.adult_content && " "}
      <span className="picAdmin__id">#{props.picture.id}</span>
    </Fragment>
  );
};
