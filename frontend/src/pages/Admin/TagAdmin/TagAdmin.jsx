import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import { Drawer, Select } from "antd";
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
          <div className="tagAdmin__modalAction">DELETE THIS TAG</div>
          <div className="tagAdmin__modalAction">REPLACE THIS TAG</div>
          <div className="tagAdmin__modalAction">RENAME THIS TAG</div>

          <Select
            allowClear={false}
            style={{ width: "100%" }}
            defaultValue={allTags[selected.current].tag}
          >
            {allTags.map((tag) => {
              return (
                <Option key={capitalizeFirstLetter(tag.tag)}>
                  {capitalizeFirstLetter(tag.tag)} ({tag.occur})
                </Option>
              );
            })}
          </Select>
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
