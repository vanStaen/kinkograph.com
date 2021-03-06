import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Drawer, Select, Switch } from "antd";
import {
  SaveOutlined,
  DeleteOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

import { capitalizeFirstLetter } from "../../../../helpers/capitalizeFirstLetter";
import { getTags } from "../../../../store/calls/getTags";
import { postTag } from "../../../../store/calls/postTag";
import { patchPicture } from "../../../../store/calls/patchPicture";
import { deletePicture } from "../../../../store/calls/deletePicture";
import { patchPictureAdult } from "../../../../store/calls/patchPictureAdult";
import { postSimilarFingerprint } from "../../../../store/calls/postSimilarFingerprint";
import { postDuplicateFingerprint } from "../../../../store/calls/postDuplicateFingerprint";

import "./EditDrawer.css";

const isSmallScreen = window.innerWidth <= 768;

const initialDrawerSize = () => {
  let initialDrawerSize = "45%";
  if (isSmallScreen) {
    initialDrawerSize = window.innerWidth;
  }
  return initialDrawerSize;
};

const { Option } = Select;

export const EditDrawer = (props) => {
  const [tags, setTags] = useState([]);
  const [isAdult, setIsAdult] = useState(props.picture.adult_content);
  const [allTags, setAllTags] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [similarFingerprints, setSimilarFingerPrints] = useState([]);
  const [duplicateFingerprints, setDuplicateFingerprints] = useState([]);
  const [widthDrawer, setWidthDrawer] = useState(initialDrawerSize());

  const fetchAllTags = useCallback(async () => {
    try {
      const fetchedTags = await getTags();
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const hideDrawer = useCallback(
    (needReload) => {
      props.setShowUploader && props.setShowUploader(true);
      props.setShowDrawer(false);
      if (needReload) {
        props.reload && props.reload();
      }
    },
    [props]
  );

  useEffect(() => {
    (async () => {
      const [similar, duplicate] = await Promise.all([
        postSimilarFingerprint(props.picture.id, 90, props.picture.fingerprint),
        postDuplicateFingerprint(props.picture.id, props.picture.fingerprint),
      ]);
      setSimilarFingerPrints(similar);
      setDuplicateFingerprints(duplicate);
    })();
  }, []);

  useEffect(() => {
    fetchAllTags();
    if (JSON.parse(props.picture.tags) !== null) {
      setTags(JSON.parse(props.picture.tags));
    }
  }, [fetchAllTags, props.picture.tags]);

  const handleTagChange = useCallback(async (value) => {
    const valueCleaned = value.map((oldTag) => {
      return capitalizeFirstLetter(oldTag);
    });
    setTags(valueCleaned);
  }, []);

  const handleSwitchIsAdult = async () => {
    await patchPictureAdult(!isAdult, props.picture.id);
    setIsAdult(!isAdult);
  };

  const submitHandler = useCallback(async () => {
    if (tags.length > 0) {
      //Add new Tags to db
      await tags.map(async (newTag) => {
        const index = allTags.findIndex(
          (tag) => tag === capitalizeFirstLetter(newTag)
        );
        if (index < 0) {
          //New Tag not found in db
          const result = await postTag(newTag);
          if (result.value === "success") {
            console.log(`${newTag} was added to the lists of tags.`);
          }
        }
        return undefined;
      });
      //Path picture
      await patchPicture(tags, props.picture.id);
      hideDrawer(true);
    }
  }, [tags, allTags, hideDrawer, props.picture.id]);

  const deleteHandler = useCallback(
    async (key) => {
      if (confirmDelete === true) {
        //Path picture
        await deletePicture(key);
        hideDrawer(true);
      } else {
        setConfirmDelete(true);
        setTimeout(() => {
          setConfirmDelete(false);
        }, 2000);
      }
    },
    [confirmDelete, hideDrawer]
  );

  return (
    <Drawer
      title={
        <span className="Drawer__Title">
          Edit picture id #{props.picture.id}
        </span>
      }
      placement="left"
      closable={true}
      onClose={() => hideDrawer(false)}
      visible={props.showDrawer}
      key={`drawer${props.picture.id}`}
      width={widthDrawer}
    >
      <div className="Drawer__font">Preview:</div>
      <img
        className="Drawer_picture"
        src={props.picture.url_med}
        alt={props.picture.id}
        key={props.picture.id}
        style={{ maxWidth: "100%", maxHeight: window.innerHeight / 2.5 }}
      />
      <br />
      <div className="Drawer__font">Tags:</div>
      <Select
        mode="tags"
        allowClear={false}
        style={{ width: "100%" }}
        placeholder="Add some tags"
        onChange={handleTagChange}
        defaultValue={
          props.picture.tags !== null
            ? JSON.parse(props.picture.tags)
            : undefined
        }
      >
        {allTags.map((tag) => {
          return (
            <Option key={capitalizeFirstLetter(tag.tag)}>
              {capitalizeFirstLetter(tag.tag)}
            </Option>
          );
        })}
      </Select>
      <br />
      <br />
      <div className="Drawer__adultContentFlag">
        <Switch defaultChecked={isAdult} onChange={handleSwitchIsAdult} />
        &nbsp; This is{!isAdult && " not"} adult content.
      </div>
      <br />
      {similarFingerprints.length > 0 && (
        <>
          <div className="Drawer__font">
            Similar {duplicateFingerprints.length > 0 && "and duplicate"}{" "}
            picture{similarFingerprints.length > 0 && "s"}:
          </div>
          {similarFingerprints.map((picture) => {
            return (
              <img
                id={picture.id}
                src={picture.url_thumb}
                alt={picture.id}
                width="100px"
              />
            );
          })}
          <br />
          <br />
        </>
      )}
      <div className="Drawer__buttonContainer">
        <div
          className={
            tags.length < 1 ? "Drawer__buttonDisabled" : "Drawer__button"
          }
          onClick={submitHandler}
        >
          <SaveOutlined /> &nbsp; Save
        </div>
        <div
          className={
            confirmDelete ? "Drawer__buttonConfirmAction" : "Drawer__button"
          }
          onClick={() => deleteHandler(props.picture.key)}
        >
          {confirmDelete ? (
            <Fragment>
              <DeleteOutlined /> ARE YOU SURE
              <QuestionOutlined />
            </Fragment>
          ) : (
            <Fragment>
              <DeleteOutlined />
              &nbsp; Delete
            </Fragment>
          )}
        </div>
      </div>
    </Drawer>
  );
};
