import axios from "axios";

export const postVerifyEmailLink = async (email, language = "en") => {

    const requestBody = {
        "sendto": email,
        "language": language,
    };

    const response = await axios({
        url: process.env.API_URL + `/mail/emailverify`,
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

    return true

};