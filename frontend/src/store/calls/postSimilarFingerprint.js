import axios from "axios";

export const postSimilarFingerprint = async (id, threshold, fingerprint) => {
  const requestBody = {
    id: id,
    threshold: threshold,
    fingerprint: fingerprint,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/pictures/similar/fingerprint/`,
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
