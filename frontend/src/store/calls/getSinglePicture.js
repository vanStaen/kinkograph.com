import axios from "axios";

export const getSinglePicture = async (key) => {

  const response = await axios({
    url: process.env.API_URL + `/pictures/${key}`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else if (response.status === 400) {
      throw new Error(`Picture key ${key} not found`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  return response.data;

};