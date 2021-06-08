const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const _ = require('lodash/core');

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

// GET all users
router.get("/users", async (req, res) => {

  /*if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }*/

  //TODO: CHeck tha user has adminr rights
  try {
    const user = await client.query(`SELECT * FROM users WHERE id>1 ORDER BY id ASC `);
    res.status(201).json(user.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }

});



module.exports = router;