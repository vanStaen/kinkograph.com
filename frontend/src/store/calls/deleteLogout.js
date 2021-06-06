import axios from "axios";

export const deleteLogout = async () => {
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/login/`,
    method: "DELETE",
  });

  if (response.status !== 204) {
    throw new Error(`Error ou Logout! Status ${response.status}`);
  }
};
