import React, { Fragment, useState } from "react";
import { EditOutlined } from '@ant-design/icons';

import { EditDrawer } from './EditDrawer';

import "./Uploader.css";

export const EditPictures = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const mouseHoverHandler = (hover) => {
        setShowEdit(hover);
        const element = document.getElementById(props.picture.id);
        if (hover) {
            element.style.filter = "brightness(50%) blur(4px)";
        } else {
            element.style.filter = "brightness(100%) blur(0px)";
        }
    }

    const clickHandler = () => {
        setTimeout(function () {
            props.setShowUploader(false);
        }, 300);
        setShowDrawer(true);
    }

    const hideDrawer = () => {
        props.setShowUploader(true);
        setShowDrawer(false);
    }

    return <Fragment>
        <EditDrawer
            picture={props.picture}
            hideDrawer={hideDrawer}
            showDrawer={showDrawer}
        />
        <div className="Uploader__missingPicture">
            {showEdit &&
                <div
                    className="Uploader__missingPictureOverText"
                    onMouseEnter={() => mouseHoverHandler(true)}
                    onMouseLeave={() => mouseHoverHandler(false)}
                    onClick={clickHandler}
                >
                    <EditOutlined />
                </div>}
            <img
                id={props.picture.id}
                className="Uploader__missingPictureImg"
                src={props.picture.url_thumb}
                alt={props.picture.id}
                width={props.size}
                height={props.size}
                onMouseEnter={() => mouseHoverHandler(true)}
                onMouseLeave={() => mouseHoverHandler(false)}
                onClick={clickHandler}
            />
        </div>
    </Fragment >
}