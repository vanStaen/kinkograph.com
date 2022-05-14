import axios from "axios";

export const postLoginCode = async (code) => {
  const requestBody = {
    code: code,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/auth/code`,
      method: "POST",
      data: requestBody,
    });

    return response;
  } catch (err) {
    if ("response" in err && err.response.status >= 400) {
      throw new Error(`${err.response.data.error}`);
    }
    throw err;
  }
};
