const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { Client } = require("pg");

// Init Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  }
});

// Check if login data sent are correct
router.post("/", async (req, res) => {
  try {
    let filter = "";
    if (req.body.email) {
      filter = `WHERE email=${req.body.email}`;
    } else if (req.body.username) {
      filter = `WHERE username=${req.body.username}`;
    } else {
      res.status(401).json({
        error: "Either 'Email' or 'Username' were provided",
      });
    }
    const password = req.body.password;
    const result = await client.query(`SELECT id, pwd FROM users ${filter}`);

    if (result.rows < 1) {
      return res.status(400).json({ error: `User does not exist!` });
    } else {
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.pwd);

      if (!isValid) {
        return res.status(400).json({ error: `Password is incorrect!` });
      }

      const accessToken = await jsonwebtoken.sign(
        { userId: user.id },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = await jsonwebtoken.sign(
        { userId: user.id },
        process.env.AUTH_SECRET_KEY_REFRESH,
        { expiresIn: "7d" }
      );

      //Update last_login in user table
      const updateLastLoginQuery = `UPDATE users SET last_login=${Date.now()} WHERE id=${
        user.id
      }`;
      await client.query(updateLastLoginQuery);

      //Add refresh token to db
      const addRefreshTokenQuery = `INSERT INTO token(refresh_token, user_id, date) 
      VALUES ('${refreshToken}', ${user.id}, ${Date.now()});`;
      await client.query(addRefreshTokenQuery);

      res.status(200).json({
        userId: user.id,
        token: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// Check if code used for Login is correct
router.post("/code", async (req, res) => {
  try {
    const code = req.body.code;
    if (code === process.env.ACCESS_CODE_GUEST) {
      res.status(200).json({
        userId: "guest",
        token: null,
        refreshToken: null,
      });
    } else {
      const access = await client.query(
        `SELECT id FROM users WHERE access_code='${code}'`
      );
      if (access.rows < 1) {
        res.status(401).json({
          error: "User not found",
        });
      } else {
        const user = access.rows[0];
        const accessToken = await jsonwebtoken.sign(
          { userId: user.id },
          process.env.AUTH_SECRET_KEY,
          { expiresIn: "15m" }
        );

        const refreshToken = await jsonwebtoken.sign(
          { userId: user.id },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );

        //Update last_login in user table
        const updateLastLoginQuery = `UPDATE users SET last_login=${Date.now()} WHERE id=${
          user.id
        }`;
        await client.query(updateLastLoginQuery);

        //Add refresh token to db
        const addRefreshTokenQuery = `INSERT INTO token(refresh_token, user_id, date) 
        VALUES ('${refreshToken}', ${user.id}, ${Date.now()});`;
        await client.query(addRefreshTokenQuery);

        res.status(200).json({
          userId: user.id,
          token: accessToken,
          refreshToken: refreshToken,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// DEL Logout
router.delete("/", async (req, res) => {
  try {
    const deleteTokensQuery = `DELETE FROM token WHERE user_id=${req.userId}`;
    await client.query(deleteTokensQuery);
    // Html resp code 204 return no content
    res.status(204).json();
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST Get Token from refresh Token
router.post("/token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const isRefreshTokenInDBQuery = `SELECT user_id FROM token WHERE refresh_token='${refreshToken}'`;
    const isRefreshTokenInDBres = await client.query(isRefreshTokenInDBQuery);
    if (isRefreshTokenInDBres.rows.length == 1) {
      const userId = isRefreshTokenInDBres.rows[0].user_id;
      // Check if RefreshToken Is valid
      try {
        decodedToken = jsonwebtoken.verify(
          refreshToken,
          process.env.AUTH_SECRET_KEY_REFRESH
        );
      } catch (err) {
        res.status(401).json({
          error: `Refresh Token not valid!`,
        });
        return next();
      }

      //Update last_login in user table
      const updateLastLoginQuery = `UPDATE users SET last_login=${Date.now()} WHERE id=${userId}`;
      await client.query(updateLastLoginQuery);

      // Generate new token and return it
      const accessToken = await jsonwebtoken.sign(
        { userId: userId },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      res.status(200).json({
        userId: userId,
        token: accessToken,
      });
    } else {
      res.status(401).json({
        error: `Refresh Token not valid!`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
