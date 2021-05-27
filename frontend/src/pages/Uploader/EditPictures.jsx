import React, { useState } from "react";
import { EditOutlined } from '@ant-design/icons';

import "./Uploader.css";

export const EditPictures = (props) => {
    const [showEdit, setShowEdit] = useState(false);


    const mouseHoverHandler = (hover) => {
        setShowEdit(hover);
        const element = document.getElementById(props.picture.id);
        if (hover) {
            element.style.filter = "brightness(50%) blur(4px)";
        } else {
            element.style.filter = "brightness(100%) blur(0px)";
        }
    }

    return <div className="Uploader__missingPicture">
        {showEdit &&
            <div
                className="Uploader__missingPictureOverText"
                onMouseEnter={() => mouseHoverHandler(true)}
                onMouseLeave={() => mouseHoverHandler(false)}
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
        />
    </div>

}