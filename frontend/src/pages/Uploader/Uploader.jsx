import React, { useState, useEffect, useCallback } from "react";
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';

import { postPicture } from './postPicture';
import { getDuplicate } from './getDuplicate';
import { getTagsMissing } from './getTagsMissing';

import "./Uploader.css";

export const Uploader = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [picsTagsMissing, setPicsTagsMissing] = useState([]);

    const fileSelectHandler = useCallback(async (event) => {
        setIsUploading(true);
        if (event.target.files[0]) {
            const name = event.target.files[0].name.split(".")[0];
            const alreadyIn = await getDuplicate(name);
            console.log(alreadyIn);
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
            const picsTagsMissing = await getTagsMissing();
            setPicsTagsMissing(picsTagsMissing);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchPicsTagsMissing();
    }, [fetchPicsTagsMissing]);

    const submitHandler = useCallback(async (file) => {
        const result = await postPicture(file);
        notification[result]({
            message: `Upload ${result}`,
            description: `File: ${file.name}`,
        });
        setIsUploading(false);
    }, []);

    return (
        <div className="Uploader__container">
            <div className="Uploader__formContainer">
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
                </div>
            </div>
            {picsTagsMissing.length > 0 &&
                < div className="Uploader__missingContainer">
                    <div className="Uploader__missingContent">
                        {picsTagsMissing.map(picture => {
                            return <img src={picture.url_thumb} alt={picture.id} width="150" height="150" />

                        })
                        }
                    </div>
                </div>}
        </div >
    );
};
