import axios from "axios";

export const postTokenVerify = async (token) => {

    const requestBody = {
        "token": token,
    };

    const response = await axios({
        url: process.env.API_URL + `/user/validtoken`,
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

    const valid = response.data.valid;
    return valid
};