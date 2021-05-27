import React from "react";
import { Drawer } from 'antd';

export const EditDrawer = (props) => {

    return (
        <Drawer
            title={<span>Edit picture id #{props.picture.id}</span>}
            placement="left"
            closable={true}
            onClose={props.hideDrawer}
            visible={props.showDrawer}
            key={`drawer${props.picture.id}`}
            width="42.5%"
        >
            {props.picture.format}
        </Drawer>
    )
}