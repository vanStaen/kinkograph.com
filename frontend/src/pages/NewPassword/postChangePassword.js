import axios from "axios";

export const postChangePassword = async (token, password) => {
  const requestBody = {
    token: token,
    password: password,
  };

  const response = await axios({
    url: process.env.API_URL + `/user/changepassword`,
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

  const changed = response.data.changed;
  return changed;
};
