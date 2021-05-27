import React, { useState, useEffect } from "react";
import { Drawer, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { getTags } from './getTags';
import { postTag } from './postTag';

import './EditDrawer.css';

export const EditDrawer = (props) => {
    const [format, setFormat] = useState(props.picture.format);
    const [tags, setTags] = useState([]);
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

    const handleTagChange = async (value) => {
        let addedTag = undefined;
        value.map(newTag => {
            const index = tags.findIndex(tag => tag === newTag);
            if (index < 0) {
                addedTag = capitalizeFirstLetter(newTag);
            }
            return undefined;
        })
        if (addedTag !== undefined) {
            const indexAllTags = allTags.findIndex(tag => tag.tag_name === addedTag);
            if (indexAllTags < 0) {
                await postTag(addedTag);
                console.log(`Add ${addedTag} to the tag list.`)
            }
        }
        const valueCleaned = value.map(oldTag => {
            return capitalizeFirstLetter(oldTag);
        });
        console.log(valueCleaned)
        setTags(valueCleaned);
    }

    const sizeFormat = (format) => {
        if (format === "item__portrait") {
            return { width: "40%", heigth: "60%" }
        } else if (format === "item__landscape") {
            return { width: "60%", heigth: "40%" }
        } else if (format === "item__square") {
            return { width: "60%", heigth: "60%" }
        } else {
            console.log(`Error, format ${format} is unknown.`)
        }
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
                onChange={handleTagChange}
            >
                {
                    allTags.map((tag) => {
                        return <Option key={tag.tag_name}>{tag.tag_name}</Option>
                    })
                }
            </Select>
            <br />
            <br />
            <div className="Drawer__font">Preview:</div>
            <div
                className="Drawer_picture"
                style={{
                    backgroundImage: `url("${props.picture.url_thumb}")`,
                    width: sizeFormat(format).width, paddingTop: sizeFormat(format).heigth
                }}
                key={props.picture.id}
            ></div>
            <div className="Drawer__buttonContainer">
                <div className="Drawer__button">
                    <SaveOutlined /> &nbsp; Save & Show
                </div>
            </div>

        </Drawer>
    )
}