import axios from "axios";

export const getTagsMissing = async (limit) => {
  const response = await axios({
    url: process.env.API_URL + `/pictures/tagsmissing/${limit}`,
    method: "GET",
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

export const getTagsMissingCountAll = async (limit) => {
  const response = await axios({
    url: process.env.API_URL + `/pictures/tagsmissingcount/`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  //console.log(response.data[0].count);
  return response.data;

};