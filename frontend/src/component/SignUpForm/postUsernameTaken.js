import axios from "axios";

export const postUsernameTaken = async (username) => {

    const requestBody = {
        "username": username
    };

    const response = await axios({
        url: process.env.API_URL + `/user/taken/`,
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

    const taken = response.data.taken;
    return taken

};