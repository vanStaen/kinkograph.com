import React, { useState, useEffect } from "react";
import { Drawer, Select } from 'antd';

import { getTags } from './getTags';

import './EditDrawer.css';

export const EditDrawer = (props) => {
    const [format, setFormat] = useState(props.picture.format);
    const [allTags, setAllTags] = useState([]);
    const { Option } = Select;

    const fetchAllTags = async () => {
        try {
            const fetchedTags = await getTags();
            setAllTags(fetchedTags)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAllTags();
    }, [fetchAllTags])

    const handleFormatChange = (value) => {
        setFormat(value);
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
                onChange={handleChange}
            >
                {
                    allTags.map((tag) => {
                        return <Option key={tag.tag_id}>{tag.tag_name}</Option>
                    })
                }
            </Select>
            <br />
            <br />
            {format}
        </Drawer>
    )
}