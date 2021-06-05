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

// POST return tags conresponding to a filter
router.post("/filter/", async (req, res) => {

 try {
    let filters = "";
    const arrayFilter = req.body.filter;
    arrayFilter.forEach(
      (filter) => (filters = filters + `AND tags LIKE '%"${filter}"%' `)
    );
    const selectTagsQuery = `SELECT tags FROM pictures WHERE tags_missing=false ${filters} `;
    const tagsFilter = await client.query(selectTagsQuery);
    const allTagsFromFilter = [];
    tagsFilter.rows.forEach((row) => {
      const tags = JSON.parse(row.tags);
      tags.forEach((tag) => {
        const findIndex = allTagsFromFilter.findIndex((e) => e.tag === tag);
        const isInFilter = arrayFilter.findIndex((e) => e.tag === tag);
        if (isInFilter < 0) {
          if (findIndex < 0) {
            allTagsFromFilter.push({ tag: tag, occur: 1 });
          } else {
            const increment = allTagsFromFilter[findIndex].occur + 1;
            allTagsFromFilter[findIndex].occur = increment;
          }
        }
      });
    });
    const allTagsFromFilterSorted = _.sortBy( allTagsFromFilter, 'tag' );;
    res.status(201).json(allTagsFromFilterSorted);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST new tag in DB
router.post("/", async (req, res) => {
  try {
    const checkIfTagsExist = await client.query(
      `SELECT * FROM tags WHERE tag_name='${req.body.tag_name}'`
    );
    if (checkIfTagsExist.rows.length > 0) {
      res.status(201).json({
        value: "failed",
        message: `${req.body.tag_name} was already in the table 'tags'`,
      });
    } else {
      await client.query(
        `INSERT INTO public.tags(tag_name) VALUES ('${req.body.tag_name}');`
      );
      res.status(201).json({
        value: "success",
        message: `${req.body.tag_name} was added to the table 'tags'`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
