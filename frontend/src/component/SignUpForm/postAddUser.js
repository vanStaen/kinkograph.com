import axios from "axios";

export const postAddUser = async (
  name,
  username,
  email,
  password,
  access_code,
  language,
) => {
  const requestBody = {
    query: `userInput: { 
              name: $name, 
              username: $username, 
              email: $email, 
              pwd: $password, 
              access_code: $access_code,
              language: $language,
            }`,
    variables: {
      name,
      username,
      email,
      password,
      access_code,
      language,
    },
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios(
      {
        url: process.env.REACT_APP_API_URL + `/users`,
        method: "POST",
        data: requestBody,
      },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }
};
