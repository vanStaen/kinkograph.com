import axios from "axios";

export const postEditTag = async (oldtag, newtag) => {

    const requestBody = {
        "oldtag": oldtag,
        "newtag": newtag,
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/tags/edit`,
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