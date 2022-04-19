const { User } = require("../../models/User");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

exports.authService = {
  async login(req, email, username, password, remindMe) {
    if (username) {
      foundUser = await User.findOne({
        where: 
          sequelize.where(
            sequelize.fn('lower', sequelize.col('userName')), 
            sequelize.fn('lower', username)
          ),
      });
    } else {
      foundUser = await User.findOne({
        where: { email: email },
      });
    }

    if (!foundUser) {
      console.log("User does not exist!");
      throw new Error("User does not exist!");
    } else {
      const isValid = await bcrypt.compare(password, foundUser.password);
      if (!isValid) {
        console.log("Password is incorrect!");
        throw new Error("Password is incorrect!");
      }

      // Set token in session cookie
      const accessToken = await jsonwebtoken.sign(
        { userId: foundUser._id },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      req.session.token = accessToken;

      // Set refreshtoken in session cookie
      if (remindMe) {
        const refreshToken = await jsonwebtoken.sign(
          { userId: foundUser._id },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );
        req.session.refreshToken = refreshToken;
      }

      // Update lastLogin in user table
      await User.update(
        { lastActive: Date.now() },
        { where: { _id: foundUser._id } }
      );

      // check if user has validated his email
      if (foundUser.verifiedEmail === false) {
        console.log("Email is not verified!");
        throw new Error("Email is not verified!");
      }

      // Return true if success
      return true;
    }
  },

  async logout(req) {
    // delete all session cookie
    req.session = null;
    // Return true if success
    return true;
  },

  async access(req) {
    if (req.isAuth === true) {
      // Return true if has access
      return true;
    } else {
      return false;
    }
  },
};
