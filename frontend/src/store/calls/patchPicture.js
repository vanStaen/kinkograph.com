import axios from "axios";

export const patchPicture = async (tags, id) => {

    const requestBody = {
        "tags": JSON.stringify(tags)
    };

    const response = await axios({
        url: process.env.API_URL + `/pictures/${id}`,
        method: "PATCH",
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