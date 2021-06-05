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
    const user = await client.query(`SELECT id, pwd FROM users ${filter}`);
    console.log(`SELECT id, pwd FROM users ${filter}`);

    if (user.rows < 1) {
      return res.status(400).json({ error: `User does not exist!` });
    }

    const isValid = await bcrypt.compare(password, user.rows[0].pwd);

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

    // TODO
    /* Add refresh token to db
    const newToken = {
      token: refreshToken,
      userId: user.id
    }; */

    res.status(200).json({
      userId: user.id,
      token: accessToken,
      refreshToken: refreshToken,
    });
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
      res.status(201).json({
        userId: "guest",
        token: null,
        refreshToken: null,
      });
    } else {
      const access = await client.query(
        `SELECT * FROM users WHERE access_code='${code}'`
      );
      if (access.rows < 1) {
        res.status(401).json({
          error: "User not found",
        });
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

      // TODO
      /* Add refresh token to db
    const newToken = {
      token: refreshToken,
      userId: user.id
    }; */

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

// DEL Logout
router.delete("/", async (req, res) => {
  if (!req.body.refreshToken) {
    return res.status(401).json({ error: `No refresh token was provided` });
  }
  const refreshToken = req.body.refreshToken;

  //TODO
  /* const deleteToken = await Token.deleteOne({ token: refreshToken });
  
    if (deleteToken.deletedCount === 0) {
      return res.status(401).json({ error: `Refresh token not found in db!` });
    }*/

  // Html resp code 204 return no content
  res.status(204).json();
});

module.exports = router;
