import React, { useState } from "react";
import { Drawer, Select } from 'antd';

import './EditDrawer.css';

export const EditDrawer = (props) => {
    const [format, setFormat] = useState(props.picture.format);

    const handleFormatChange = (value) => {
        setFormat(value);
    }

    const { Option } = Select;

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }


    return (
        <Drawer
            title={<span className="Drawer__Title">Edit picture id #{props.picture.id}</span>}
            placement="left"
            closable={true}
            onClose={props.hideDrawer}
            visible={props.showDrawer}
            key={`drawer${props.picture.id}`}
            width="42.5%"
        >
            <div className="Drawer__font">Format:</div>
            <Select
                defaultValue={format}
                style={{ width: '100%' }}
                onChange={handleFormatChange}>
                <Option value="item__square">Square</Option>
                <Option value="item__portrait">Portrait</Option>
                <Option value="item__landscape">Landscape</Option>
            </Select>
            <br />
            <br />
            <div className="Drawer__font">Tags:</div>
            <Select
                mode="tags"
                allowClear={false}
                style={{ width: '100%' }}
                placeholder="Add some tags"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
            >
                {children}
            </Select>
            <br />
            <br />
            {format}
        </Drawer>
    )
}