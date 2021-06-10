import React, { useState, useEffect, useCallback, Fragment } from "react";
import {
  PictureOutlined,
  LoadingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { observer } from "mobx-react";

import { EditPictures } from "./EditPictures/EditPictures";
import { postPicture } from "../../../store/calls/postPicture";
import { getDuplicate } from "../../../store/calls/getDuplicate";
import {
  getTagsMissing,
  getTagsMissingCountAll,
} from "../../../store/calls/getTagsMissing";

import "./Uploader.css";

const SIZE_PICTURE_MISSING_TAG = 150;

export const Uploader = observer(() => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragDroping, setIsDragDroping] = useState(false);
  const [picsTagsMissing, setPicsTagsMissing] = useState([]);
  const [showUploader, setShowUploader] = useState(true);
  const [uploadProgress, setUploadProgress] = useState([0, 0]);
  const [limit, setLimit] = useState(null);
  const [missingCountAll, setMissingCountAll] = useState(null);

  const submitHandler = useCallback(async (file) => {
    const result = await postPicture(file);
    notification[result]({
      message: `Upload ${result}`,
      description: `File: ${file.name}`,
    });
  }, []);

  const fetchTagsMissingCountAll = useCallback(async () => {
    try {
      const count = await getTagsMissingCountAll();
      const countMinusLimit = count - limit;
      setMissingCountAll(countMinusLimit);
    } catch (err) {
      console.log(err);
    }
  }, [limit]);

  const calculateMissingTagPicLimit = useCallback(() => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const missingPicContainerWidth = Math.floor(pageWidth * 0.4);
    const missingPicContainerHeight = Math.floor(pageHeight * (1 - 0.25));
    const numOfPicFittingInContainer =
      Math.floor(missingPicContainerWidth / (SIZE_PICTURE_MISSING_TAG + 34)) *
      Math.floor(missingPicContainerHeight / (SIZE_PICTURE_MISSING_TAG + 30));
    setLimit(numOfPicFittingInContainer);
    return numOfPicFittingInContainer;
  }, []);

  const fetchPicsTagsMissing = useCallback(async () => {
    try {
      const limit = await calculateMissingTagPicLimit();
      const picsTagsMissing = await getTagsMissing(limit);
      await fetchTagsMissingCountAll();
      setPicsTagsMissing(picsTagsMissing);
    } catch (err) {
      console.log(err);
    }
  }, [fetchTagsMissingCountAll, calculateMissingTagPicLimit]);

  const fileSelectHandler = useCallback(
    async (event) => {
      setIsUploading(true);
      if (event.target.files[0]) {
        const name = event.target.files[0].name.split(".")[0];
        const alreadyIn = await getDuplicate(name);
        if (alreadyIn.length === 0) {
          await submitHandler(event.target.files[0]);
        } else {
          notification.warning({
            message: `Duplicate? `,
            description: `There is already a file named '${event.target.files[0].name}'`,
          });
        }
      }
      setIsUploading(false);
      setTimeout(() => {
        fetchPicsTagsMissing(limit);
      }, 500);
    },
    [fetchPicsTagsMissing, limit, submitHandler]
  );

  useEffect(() => {
    fetchPicsTagsMissing();
    window.addEventListener("resize", calculateMissingTagPicLimit);
    return () => {
      window.removeEventListener("resize", calculateMissingTagPicLimit);
    };
  }, [fetchPicsTagsMissing, calculateMissingTagPicLimit]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragDroping(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const objectOfFiles = e.dataTransfer.files;
    const numberOfFiles = objectOfFiles.length;
    setUploadProgress([0, numberOfFiles]);
    for (let i = 0; i < numberOfFiles; i++) {
      setIsUploading(true);
      setUploadProgress([i, numberOfFiles]);
      if (objectOfFiles[i]) {
        const file = objectOfFiles[i];
        const name = file.name.split(".")[0];
        const alreadyIn = await getDuplicate(name);
        if (alreadyIn.length === 0) {
          await submitHandler(file);
        } else {
          notification.warning({
            message: `Duplicate? `,
            description: `There is already a file named '${name}'`,
          });
        }
      }
    }
    setUploadProgress([0, 0]);
    setIsUploading(false);
    setTimeout(() => {
      fetchPicsTagsMissing(limit);
    }, 1000);
  };

  return (
    <div className="Uploader__container">
      <div className="Uploader__formContainer">
        {showUploader && (
          <div
            className="Uploader__formContent"
            style={
              picsTagsMissing.length ? { width: "50vw" } : { width: "100vw" }
            }
          >
            <form onSubmit={submitHandler}>
              <input
                type="file"
                className="inputfile"
                name="inputfile"
                id="file"
                onChange={fileSelectHandler}
              />
              {isUploading ? (
                <label
                  htmlFor="file"
                  style={
                    picsTagsMissing.length
                      ? { width: "35vw" }
                      : { width: "75vw" }
                  }
                >
                  <LoadingOutlined className="Uploader__spinner" />
                  {uploadProgress[1] ? (
                    <p className="form-upload-text">
                      {uploadProgress[0]} of {uploadProgress[1]}
                    </p>
                  ) : (
                    <p className="form-upload-text">Loading</p>
                  )}
                </label>
              ) : (
                <label
                  htmlFor="file"
                  onDrop={handleDrop}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  style={
                    picsTagsMissing.length
                      ? { width: "35vw" }
                      : { width: "75vw" }
                  }
                >
                  {!isDragDroping ? (
                    <Fragment>
                      <p className="form-upload-drag-icon">
                        <PictureOutlined />
                      </p>
                      <p className="form-upload-hint">
                        Click, or drag here a file <br />
                        <i>jpg and png file only</i>
                      </p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p className="form-upload-drag-icon">
                        <FileAddOutlined />
                      </p>
                      <p className="form-upload-hint">
                        Drop your files here <br />
                        <i>Multiple files supported</i>
                      </p>
                      <p className="form-upload-text"></p>
                    </Fragment>
                  )}
                </label>
              )}
            </form>
          </div>
        )}
      </div>
      {picsTagsMissing.length > 0 && (
        <div className="Uploader__missingContainer">
          <div className="Uploader__missingContent">
            {picsTagsMissing.map((picture, index) => {
              return (
                <EditPictures
                  picture={picture}
                  size={SIZE_PICTURE_MISSING_TAG}
                  setShowUploader={setShowUploader}
                  key={picture.id}
                  reload={fetchPicsTagsMissing}
                  totalMissingTag={index + 1 === limit ? missingCountAll : null}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
