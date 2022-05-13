import axios from "axios";

export const patchUserFavorites = async (favorites) => {

    const requestBody = {
        "input": {
            "favorites": favorites,
        }
    };

    const response = await axios({
        url: process.env.API_URL + `/user`,
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

    return response;
};