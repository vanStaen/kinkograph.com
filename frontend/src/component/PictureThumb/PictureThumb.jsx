import React, { useState, Fragment } from "react";

import { EditDrawer } from '../EditDrawer/EditDrawer';

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
            <div
                className={`item ${props.picture.format}`}
                style={{ backgroundImage: `url("${props.picture.url_thumb}")` }}
                key={props.picture.id}
                onClick={() => setShowDrawer(true)}
            >
                {props.picture.tags === "[]" && "TAGS MISSING"}

            </div>
        </Fragment>)
} 