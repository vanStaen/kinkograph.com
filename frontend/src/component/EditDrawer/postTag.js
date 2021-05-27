import axios from "axios";

export const postTag = async (tag_name) => {

    const requestBody = {
        "tag_name": tag_name,
    };

    console.log(requestBody);

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/tags/`,
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