import axios from "axios";

export const deleteTag = async (tag) => {

    const requestBody = {
        "tagToDelete": tag,
    };

    const response = await axios({
        url: process.env.API_URL + `/tags/`,
        method: "DELETE",
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