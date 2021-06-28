const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = express.Router();
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


// GET random picture
router.get("/", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT url_med FROM pictures ORDER BY RANDOM() LIMIT 1`
    );
    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      res.status(400).json({
        error: `No picture found with key ${req.params.key}!`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
