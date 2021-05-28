import React, { useState, useEffect, useCallback } from "react";
import { Drawer, Select } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { getTags } from "./getTags";
import { postTag } from "./postTag";
import { patchPicture } from "./patchPicture";

import "./EditDrawer.css";

export const EditDrawer = (props) => {
  const [format, setFormat] = useState(props.picture.format);
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const { Option } = Select;

  const fetchAllTags = useCallback(async () => {
    try {
      const fetchedTags = await getTags();
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const hideDrawer = (needReload = false) => {
    props.setShowUploader && props.setShowUploader(true);
    props.setShowDrawer(false);
    //if (needReload) { props.reload(); };
  }

  useEffect(() => {
    fetchAllTags();
    if (JSON.parse(props.picture.tags) !== null) {
      setTags(JSON.parse(props.picture.tags));
    }
  }, [fetchAllTags]);

  const handleFormatChange = (value) => {
    setFormat(value);
  };

  const handleTagChange = useCallback(async (value) => {
    const valueCleaned = value.map((oldTag) => {
      return capitalizeFirstLetter(oldTag);
    });
    setTags(valueCleaned);
  }, []);

  const sizeFormat = useCallback((format) => {
    if (format === "item__portrait") {
      return { width: "40%", heigth: "60%" };
    } else if (format === "item__landscape") {
      return { width: "60%", heigth: "40%" };
    } else if (format === "item__square") {
      return { width: "60%", heigth: "60%" };
    } else {
      console.log(`Error, format ${format} is unknown.`);
    }
  }, [format]);

  const submitHandler = useCallback(async () => {
    //Add new Tags to db
    await tags.map(async (newTag) => {
      const index = allTags.findIndex(
        (tag) => tag === capitalizeFirstLetter(newTag)
      );
      if (index < 0) {
        //New Tag not found in db
        const result = await postTag(newTag);
        if (result.value === 'success') {
          console.log(`${newTag} was added to the lists of tags.`);
        };
      }
      return undefined;
    });
    //Path picture
    await patchPicture(tags, format, props.picture.id);
    hideDrawer(true);
  }, [tags, allTags, format, patchPicture, postTag]);

  return (
    <Drawer
      title={
        <span className="Drawer__Title">
          Edit picture id #{props.picture.id}
        </span>
      }
      placement="left"
      closable={true}
      onClose={hideDrawer}
      visible={props.showDrawer}
      key={`drawer${props.picture.id}`}
      width="42.5%"
    >
      <div className="Drawer__font">Format:</div>
      <Select
        defaultValue={format}
        style={{ width: "100%" }}
        onChange={handleFormatChange}
      >
        <Option value="item__square">Square</Option>
        <Option value="item__portrait">Portrait</Option>
        <Option value="item__landscape">Landscape</Option>
      </Select>
      <br />
      <br />
      <div className="Drawer__font">Preview:</div>
      <div
        className="Drawer_picture"
        style={{
          backgroundImage: `url("${props.picture.url_med}")`,
          width: sizeFormat(format).width,
          paddingTop: sizeFormat(format).heigth,
        }}
        key={props.picture.id}
      />
      <br />
      <br />
      <div className="Drawer__font">Tags:</div>
      <Select
        mode="tags"
        allowClear={false}
        style={{ width: "100%" }}
        placeholder="Add some tags"
        onChange={handleTagChange}
        defaultValue={JSON.parse(props.picture.tags)}
      >
        {allTags.map((tag) => {
          return <Option key={capitalizeFirstLetter(tag.tag_name)}>{capitalizeFirstLetter(tag.tag_name)}</Option>;
        })}
      </Select>
      <br />
      <br />
      <div className="Drawer__buttonContainer">
        <div
          className={
            tags.length < 1 ? "Drawer__buttonDisabled" : "Drawer__button"
          }
          onClick={submitHandler}
        >
          <SaveOutlined /> &nbsp; Save & Show
        </div>
      </div>
    </Drawer>
  );
};
