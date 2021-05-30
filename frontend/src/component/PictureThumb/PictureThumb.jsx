import React, { useState, Fragment } from "react";

import { EditDrawer } from '../EditDrawer/EditDrawer';
import './PictureThumb.css';

export const PictureThumb = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <Fragment>
            <EditDrawer
                picture={props.picture}
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                reload={props.reload}
            />
            <div className="picture__container">
                <img
                    className={`picture ${!props.picture.tags && "picture__bluryGray"}`}
                    src={props.picture.url_thumb}
                    alt={props.picture.id}
                    key={props.picture.id}
                    onClick={() => setShowDrawer(true)}
                />
                <div className="picture__tagMissing">{!props.picture.tags && "TAGS MISSING"}</div>
            </div>
        </Fragment>)
} 