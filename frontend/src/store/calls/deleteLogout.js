import axios from "axios";

export const deleteLogout = async () => {
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/auth/logout/`,
    method: "DELETE",
  });

  console.log("response", response)

  if (response.status !== 204) {
    throw new Error(`Error ou Logout! Status ${response.status}`);
  }

};
