import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import {
  SaveOutlined,
  DeleteOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Drawer, Select, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getFilteredTags } from "../../../store/calls/getTags";
import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";

import "./TagAdmin.css";

const { Option } = Select;

export const TagAdmin = () => {
  const [allTags, setAllTags] = useState([]);
  const selected = useRef(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [renameValue, setRenameValue] = useState(null);
  const [replaceValue, setReplaceValue] = useState(null);

  const fetchAllTags = useCallback(async () => {
    try {
      const fetchedTags = await getFilteredTags([]);
      setAllTags(fetchedTags);
    } catch (err) {
      console.log(err);
    }
    setisLoading(false);
  }, []);

  const tagClickHandler = (index) => {
    setShowDrawer(true);
    selected.current = index;
    setRenameValue(allTags[index].tag);
    setReplaceValue(allTags[index].tag);
  };

  const deleteHandler = useCallback(
    async (key) => {
      if (confirmDelete === true) {
        //await deleteTag(tag);
        setShowDrawer(false);
      } else {
        setConfirmDelete(true);
        setTimeout(() => {
          setConfirmDelete(false);
        }, 2000);
      }
    },
    [confirmDelete, setShowDrawer]
  );

  const selectChangeHandler = (value) => {
    setReplaceValue(value);
  };

  const submitReplaceHandler = async () => {
    if (replaceValue !== allTags[selected.current].tag) {
      console.log(
        `Replace ${allTags[selected.current].tag} with ${replaceValue}`
      );
      await editTag(oldTag, newTag);
    }
    setShowDrawer(false);
  };

  const submitRenameHandler = async () => {
    if (renameValue !== allTags[selected.current].tag) {
      console.log(
        `Rename ${allTags[selected.current].tag} with ${renameValue}`
      );
      await editTag(oldTag, newTag);
    }
    setShowDrawer(false);
  };

  useEffect(() => {
    fetchAllTags();
  }, [fetchAllTags]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="App__flex">
          <LoadingOutlined className="Gallery__spinner" />
          <div className="gallery__spinnerText">loading</div>
        </div>
      ) : (
        <Drawer
          className="tagAdmin__drawer"
          title={
            <span className="tagAdmin__Title">
              Edit {allTags[selected.current].tag}
            </span>
          }
          placement="left"
          closable={true}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          key={`drawer${allTags[selected.current].tag}`}
          width="42.5%"
        >
          <Select
            allowClear={false}
            style={{ width: "100%" }}
            defaultValue={allTags[selected.current].tag}
            onChange={(value) => {
              selectChangeHandler(value);
            }}
          >
            {allTags.map((tag) => {
              return (
                <Option key={capitalizeFirstLetter(tag.tag)}>
                  {capitalizeFirstLetter(tag.tag)} ({tag.occur})
                </Option>
              );
            })}
          </Select>
          <div
            className={
              replaceValue === allTags[selected.current].tag
                ? "Drawer__buttonDisabled"
                : "Drawer__button"
            }
            onClick={submitReplaceHandler}
          >
            <SaveOutlined /> &nbsp; REPLACE THIS TAG
          </div>
          <br />
          <br />
          <Input
            defaultValue={allTags[selected.current].tag}
            onChange={(event) => {
              setRenameValue(event.target.value);
            }}
            placeholder="Basic usage"
          />
          <div
            className={
              renameValue === allTags[selected.current].tag
                ? "Drawer__buttonDisabled"
                : "Drawer__button"
            }
            onClick={submitRenameHandler}
          >
            <SaveOutlined /> &nbsp; RENAME THIS TAG
          </div>
          <br />
          <br />

          <div className="Drawer__buttonContainer">
            <div
              className={
                confirmDelete ? "Drawer__buttonConfirmAction" : "Drawer__button"
              }
              onClick={() => deleteHandler(allTags[selected.current].tag)}
            >
              {confirmDelete ? (
                <Fragment>
                  <DeleteOutlined /> ARE YOU SURE
                  <QuestionOutlined />
                </Fragment>
              ) : (
                <Fragment>
                  <DeleteOutlined />
                  &nbsp; DELETE THIS TAG
                </Fragment>
              )}
            </div>
          </div>
        </Drawer>
      )}
      <div className="tagAdmin__main">
        {allTags.map((e, index) => {
          return (
            <div
              className={`tagAdmin__tag ${e.occur < 5 && `red`}`}
              onClick={() => tagClickHandler(index)}
              key={`tag_index_${index}`}
            >
              {e.tag ? e.tag : <i>null</i>}
              <span className="tagAdmin__occur"> ({e.occur})</span>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
