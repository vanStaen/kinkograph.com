const forbiddenUsername  = require("./data/forbiddenUsername");

const checkUsernameforbidden = (username) => {
    if (username in forbiddenUsername) {
      return true;
    }
    return false;
  };


module.exports = checkUsernameforbidden;