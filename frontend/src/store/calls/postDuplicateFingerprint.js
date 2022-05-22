import axios from "axios";

export const postDuplicateFingerprint = async (id, fingerprint) => {
  const requestBody = {
    id: id,
    fingerprint: fingerprint,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/pictures/duplicate/fingerprint/`,
      method: "POST",
      data: requestBody,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }
};
