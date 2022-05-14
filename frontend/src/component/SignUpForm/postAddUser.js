import axios from "axios";

export const postAddUser = async (
  firstname,
  lastname,
  username,
  email,
  password,
  access_code,
  language
) => {
  const requestBody = {
    userInput: {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      pwd: password,
      access_code: access_code,
      language: language,
    },
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await axios(
    {
      url: process.env.API_URL + `/user`,
      method: "POST",
      data: requestBody,
    },
    {
      headers: headers,
    }
  );

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  return response.data;
};
