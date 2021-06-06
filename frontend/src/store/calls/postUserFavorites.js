import axios from "axios";

export const postUserFavorites = async (favorites) => {

    const requestBody = {
        "favorites": JSON.stringify(favorites),
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/user/favorites`,
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

    return response;
};