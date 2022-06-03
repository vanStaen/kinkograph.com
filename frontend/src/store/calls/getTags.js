import axios from "axios";

export const getTags = async () => {

    const response = await axios({
        url: process.env.API_URL + `/tags/`,
        method: "GET",
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    return response.data;
};


export const getFilteredTags = async (filter) => {

    const requestBody = {
        "filter": filter,
    };

    const response = await axios({
        url: process.env.API_URL + `/tags/filter`,
        method: "POST",
        data: requestBody,
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    return response.data;
};

export const getTagsCount = async () => {

    const response = await axios({
        url: process.env.API_URL + `/tags/count/`,
        method: "GET",
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    return response.data;
};
