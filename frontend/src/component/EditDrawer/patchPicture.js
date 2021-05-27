import axios from "axios";

export const patchPicture = async (tags, format, id) => {

    const requestBody = {
        "tags": JSON.stringify(tags),
        "format": format
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/pictures/${id}`,
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