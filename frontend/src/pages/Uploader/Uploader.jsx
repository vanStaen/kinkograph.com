import React, { Fragment, useState } from "react";
import { CameraOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { postPicture } from './postPicture';

import "./Uploader.css";

export const Uploader = () => {
    const [isUploading, setIsUploading] = useState(false);

    const fileSelectHandler = async (event) => {
        setIsUploading(true);
        await submitHandler(event.target.files[0]);
    }

    const submitHandler = async (file) => {
        await postPicture(file);
        setIsUploading(false);
    }

    return (
        <Fragment>
            <form
                onSubmit={submitHandler}
                style={{ marginBottom: "30px" }}
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
                        <Spin size="large" />
                    </label>) :
                    (<label htmlFor="file">
                        <p className="form-upload-drag-icon">
                            <CameraOutlined />
                        </p>
                        <p className="form-upload-text">Create Look</p>
                        <p className="form-upload-hint">
                            Start with a photo <br />
            Click, or drag here a file
          </p>
                    </label>)}
            </form>
        </Fragment >
    );
};
