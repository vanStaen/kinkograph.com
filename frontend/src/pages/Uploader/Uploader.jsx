import React, { useState, useEffect, useCallback } from "react";
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';

import { EditPictures } from './EditPictures/EditPictures';
import { postPicture } from './postPicture';
import { getDuplicate } from './getDuplicate';
import { getTagsMissing } from './getTagsMissing';

import "./Uploader.css";

const SIZE_PICTURE_MISSING_TAG = 150;

export const Uploader = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [picsTagsMissing, setPicsTagsMissing] = useState([]);
    const [showUploader, setShowUploader] = useState(true);
    const [limit, setLimit] = useState(undefined);

    const fileSelectHandler = useCallback(async (event) => {
        setIsUploading(true);
        if (event.target.files[0]) {
            const name = event.target.files[0].name.split(".")[0];
            const alreadyIn = await getDuplicate(name);
            if (alreadyIn.length === 0) {
                await submitHandler(event.target.files[0]);
            } else {
                notification.warning({
                    message: `Dupplicate? `,
                    description: `There is already a file named '${event.target.files[0].name}'`,
                })
                setIsUploading(false);
            }
        } else {
            setIsUploading(false);
        }
    }, []);

    const fetchPicsTagsMissing = useCallback(async () => {
        try {
            const limit = await calculateMissingTagPicLimit();
            const picsTagsMissing = await getTagsMissing(limit);
            setPicsTagsMissing(picsTagsMissing);
        } catch (err) {
            console.log(err);
        }
    }, [limit]);

    const calculateMissingTagPicLimit = useCallback(() => {
        const pageWidth = window.innerWidth;
        const missingPicContainerWidth = Math.floor(pageWidth * 0.4);
        const numOfPicFittingInContainer = Math.floor(missingPicContainerWidth / (SIZE_PICTURE_MISSING_TAG + 34)) * 3;
        setLimit(numOfPicFittingInContainer);
        return numOfPicFittingInContainer;
    }, []);

    useEffect(() => {
        fetchPicsTagsMissing(limit);
        window.addEventListener("resize", calculateMissingTagPicLimit);
        return () => {
            window.removeEventListener("resize", calculateMissingTagPicLimit);
        };
    }, [fetchPicsTagsMissing, calculateMissingTagPicLimit]);

    const submitHandler = useCallback(async (file) => {
        const result = await postPicture(file);
        notification[result]({
            message: `Upload ${result}`,
            description: `File: ${file.name}`,
        });
        fetchPicsTagsMissing(limit);
        setIsUploading(false);
    }, []);

    return (
        <div className="Uploader__container">
            <div className="Uploader__formContainer">
                {showUploader &&
                    <div
                        className="Uploader__formContent"
                        style={picsTagsMissing.length ? { width: "50vw" } : { width: "100vw" }}>
                        <form
                            onSubmit={submitHandler}
                        >
                            <input
                                type="file"
                                className="inputfile"
                                name="inputfile"
                                id="file"
                                onChange={fileSelectHandler}
                            />
                            {isUploading ?
                                (<label
                                    htmlFor="file"
                                    style={picsTagsMissing.length ? { width: "35vw" } : { width: "75vw" }}
                                >
                                    <LoadingOutlined className="Uploader__spinner" />
                                    <p className="form-upload-text">
                                        Loading
                        </p>
                                </label>) :
                                (<label htmlFor="file"
                                    style={picsTagsMissing.length ? { width: "35vw" } : { width: "75vw" }}
                                >
                                    <p className="form-upload-drag-icon">
                                        <PictureOutlined />
                                    </p>
                                    <p className="form-upload-hint">
                                        Click, or drag here a file <br />
                                        <i>jpg and png file only</i>
                                    </p>
                                </label>)}
                        </form>
                    </div>}
            </div>
            {picsTagsMissing.length > 0 &&
                < div className="Uploader__missingContainer">
                    <div className="Uploader__missingContent">
                        {picsTagsMissing.map(picture => {
                            return <EditPictures
                                picture={picture}
                                size={SIZE_PICTURE_MISSING_TAG}
                                setShowUploader={setShowUploader}
                                key={picture.id}
                            />
                        })
                        }
                    </div>
                </div>}
        </div >
    );
};
