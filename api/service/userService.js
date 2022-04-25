const { User } = require("../../models/User");
const checkUsernameforbidden = require("../../helpers/checkUsernameforbidden")
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userService = {
  async taken(username) {
    foundUser = await User.findOne({
      where: { username: username },
    });
    if (foundUser) {
      return true;
    }
    if (checkUsernameforbidden(username)) {
      return true;
    }
    return false;
  },

  async email(email) {
    foundUser = await User.findOne({
      where: { email: email },
    });
    if (!foundUser) {
      return false;
    } else {
      return true;
    }
  },

  async validtoken(token) {
    try {
      decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_RECOVERY
      );
    } catch (err) {
      return false;
    }
    return true;
  },

  async changepassword(token, password) {
    try {
      decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_RECOVERY
      );
      const email = decodedToken.email;
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.update(
        { password: hashedPassword },
        {
          where: {
            email: email,
          },
          returning: true,
          plain: true,
        }
      );
      return true;
    } catch (err) {
      return false;
    }
  },

  async emailverified(token) {
    try {
      decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_EMAILVERIFY
      );
      const email = decodedToken.email;
      await User.update(
        { verifiedEmail: true },
        {
          where: {
            email: email,
          },
          returning: true,
          plain: true,
        }
      );
      return true;
    } catch (err) {
      return false;
    }
  },
};
