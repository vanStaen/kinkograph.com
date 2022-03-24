import axios from "axios";

export const postEmailExist = async (email) => {

    const requestBody = {
        "email": email
    };

    const response = await axios({
        url: process.env.API_URL + `/user/email/`,
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

    const exist = response.data.exist;
    return exist

};