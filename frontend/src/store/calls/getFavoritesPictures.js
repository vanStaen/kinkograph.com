import axios from "axios";

export const getFavoritesPictures = async (favorites) => {

  const requestBody = {
    "favorites": favorites,
  };

  const response = await axios({
    url: process.env.API_URL + `/pictures/favorites/`,
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
