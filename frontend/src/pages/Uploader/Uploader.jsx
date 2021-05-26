import React, { Fragment, useState } from "react";
import { notification, Spin } from 'antd';

import axios from "axios";

import { CameraOutlined } from '@ant-design/icons';

import "./Uploader.css";

export const Uploader = () => {
    const [isUploading, setIsUploading] = useState(false);

    const fileSelectHandler = async (event) => {
        setIsUploading(true);
        submitHandler(event.target.files[0]);
    }

    const submitHandler = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData)
            notification.success({ message: `File uploaded successfully.`, placement: "bottomRight", });
            console.log('Success!', res.data);
        } catch (err) {
            notification.error({ message: `File upload failed.`, placement: "bottomRight", });
            console.log(err)
        }
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
