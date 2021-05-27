import React, { Fragment, useState } from "react";
import { EditOutlined } from '@ant-design/icons';

import { EditDrawer } from '../../../component/EditDrawer/EditDrawer';

import "./EditPictures.css";

export const EditPictures = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const mouseHoverHandler = (hover) => {
        setShowEdit(hover);
        const element = document.getElementById(props.picture.id);
        if (hover) {
            element.style.filter = "brightness(50%) blur(2px)";
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

    const hideDrawer = (needReload = false) => {
        props.setShowUploader(true);
        setShowDrawer(false);
        if (needReload) { props.reload(); };
    }

    return <Fragment>
        <EditDrawer
            picture={props.picture}
            hideDrawer={hideDrawer}
            showDrawer={showDrawer}
        />
        <div className="EditPictures__missingPicture">
            {showEdit &&
                <div
                    className="EditPictures__missingPictureOverText"
                    onMouseEnter={() => mouseHoverHandler(true)}
                    onMouseLeave={() => mouseHoverHandler(false)}
                    onClick={clickHandler}
                >
                    <EditOutlined />
                </div>}
            <img
                id={props.picture.id}
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