import React, { useState } from "react";
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';


import { postPicture } from './postPicture';

import "./Uploader.css";

export const Uploader = () => {
    const [isUploading, setIsUploading] = useState(false);

    const fileSelectHandler = async (event) => {
        setIsUploading(true);
        if (event.target.files[0]) {
            //TODO: Check if not already in DB
            await submitHandler(event.target.files[0]);
        } else {
            setIsUploading(false);
        }
    }

    const submitHandler = async (file) => {
        const result = await postPicture(file);
        notification[result]({
            message: `Upload ${result}`,
            description: `File: ${file.name}`,
        });
        setIsUploading(false);
    }

    return (
        <div className="Uploader__container">
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
                    (<label htmlFor="file">
                        <LoadingOutlined className="Uploader__spinner" />
                        <p className="form-upload-text">
                            Loading
                        </p>
                    </label>) :
                    (<label htmlFor="file">
                        <p className="form-upload-drag-icon">
                            <PictureOutlined />
                        </p>
                        <p className="form-upload-hint">
                            Click, or drag here a file <br />
                                Allowed are jpg and png file only
                        </p>
                    </label>)}
            </form>
        </div >
    );
};