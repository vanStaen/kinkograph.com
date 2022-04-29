const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const _ = require("lodash/core");

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


// POST store Favorites
router.post("/favorites", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const query = `UPDATE users SET favorites='${req.body.favorites}' WHERE id=${req.userId}`;
    await client.query(query);
    res.status(201).json({ message: "Success! Favorites have been saved." });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;
