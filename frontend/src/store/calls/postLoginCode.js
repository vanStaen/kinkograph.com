import axios from "axios";

export const postLoginCode = async (code) => {
  const requestBody = {
    code: code,
  };

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/auth/code`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error(`Error! ${response.error}`);
  }

  return response;
};
