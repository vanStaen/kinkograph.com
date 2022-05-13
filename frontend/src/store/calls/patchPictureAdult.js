import axios from "axios";

export const patchPictureAdult = async (isAdult, id) => {

    const requestBody = {
        "isAdult": isAdult
    };

    const response = await axios({
        url: process.env.API_URL + `/pictures/isAdult/${id}`,
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