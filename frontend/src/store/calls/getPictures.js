import axios from "axios";

export const getPictures = async (limit, showMissing) => {

    const response = await axios({
    url: process.env.REACT_APP_API_URL + `/pictures/all/${limit}/${showMissing}`,
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

export const getPicturesPerPage = async (pageNumber, pageSize, filter = "") => {

  const requestBody = {
    "pageNumber": pageNumber,
    "pageSize": pageSize,
    "filter": filter,
  };

  const response = await axios({
      url: process.env.REACT_APP_API_URL + `/pictures/page`,
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


export const getTotalPictures = async (filter = "") => {

  const requestBody = {
    "filter": filter,
  };

  const response = await axios({
      url: process.env.REACT_APP_API_URL + `/pictures/total/`,
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
