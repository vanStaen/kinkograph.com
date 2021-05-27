const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const { Client } = require("pg");

// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  }
})

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await client.query(`SELECT * FROM tags ORDER BY tag_name ASC`);
    res.status(201).json(tags.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});


// POST new tag in DB
router.post("/", async (req, res) => {
  try {
    await client.query(`INSERT INTO public.tags(tag_name) VALUES ('${req.body.tag_name}');`);
    res.status(201).json(`${req.body.tag_name} was added to the table 'tags'`);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});


module.exports = router;
