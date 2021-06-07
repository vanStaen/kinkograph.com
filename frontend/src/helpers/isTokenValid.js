import jwt_decode from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }
  let decodedToken = jwt_decode(token);
  //console.log("Decoded Token", decodedToken);
  let currentDate = new Date();
  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    //console.log("Valid token");
    return true;
  }
};
