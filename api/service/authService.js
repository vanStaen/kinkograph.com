const { User } = require("../../models/User");
const { Picture } = require("../../models/Picture");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

exports.authService = {
  async login(req, email, username, password, remindMe) {
    if (username) {
      foundUser = await User.findOne({
        where: sequelize.where(
          sequelize.fn("lower", sequelize.col("username")),
          sequelize.fn("lower", username)
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
      const isValid = await bcrypt.compare(password, foundUser.pwd);
      if (!isValid) {
        console.log("Password is incorrect!");
        throw new Error("Password is incorrect!");
      }

      // Set token in session cookie
      const accessToken = await jsonwebtoken.sign(
        { userId: foundUser.id, isAdmin: foundUser.is_admin },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      req.session.token = accessToken;

      // Set refreshtoken in session cookie
      if (remindMe) {
        const refreshToken = await jsonwebtoken.sign(
          { userId: foundUser.id, isAdmin: foundUser.is_admin },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );
        req.session.refreshToken = refreshToken;
      }

      // Update lastLogin and nb_picture_at_last_login in user table
      const { count } = await Picture.findAndCountAll();
      await User.update(
        { last_login: Date.now(), nb_picture_at_last_login: count },
        { where: { id: foundUser.id } }
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

  async code(req, code) {
    if (code === process.env.ACCESS_CODE_GUEST) {
      // Set token in session cookie
      const accessToken = await jsonwebtoken.sign(
        { userId: "guest", isAdmin: false },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      req.session.token = accessToken;
      return {access: true, id: "guest"};
    }

    foundUser = await User.findOne({
      where: { access_code: code },
    });

    if (!foundUser) {
      throw new Error("Wrong access code!");
    } else {
      // Set token in session cookie
      const accessToken = await jsonwebtoken.sign(
        { userId: foundUser.id, isAdmin: foundUser.is_admin },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      req.session.token = accessToken;

      // Set refreshtoken in session cookie
      if (remindMe) {
        const refreshToken = await jsonwebtoken.sign(
          { userId: foundUser.id, isAdmin: foundUser.is_admin },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );
        req.session.refreshToken = refreshToken;
      }

      // Update lastLogin and nb_picture_at_last_login in user table
      const { count } = await Picture.findAndCountAll();
      await User.update(
        { last_login: Date.now(), nb_picture_at_last_login: count },
        { where: { id: foundUser.id } }
      );

      // Return true if success
      return {access: true, id: foundUser.id};
    }
  },
};
