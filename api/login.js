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
          { expiresIn: "7d" }
        );

        const refreshToken = await jsonwebtoken.sign(
          { userId: user.id },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );

        //Update last_login & nb_picture_at_last_login in user table
        const totalPic = await client.query(
          `SELECT COUNT(id) FROM pictures WHERE tags_missing=false;`
        );
        const updateLastLoginQuery = `UPDATE users SET last_login=${Date.now()}, nb_picture_at_last_login=${
          totalPic.rows[0].count
        } WHERE id=${user.id}`;
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


module.exports = router;
