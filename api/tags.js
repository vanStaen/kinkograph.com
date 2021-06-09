const express = require("express");
const router = express.Router();
const { Client } = require("pg");
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

// GET all tags
router.get("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
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
    const allTagsFromFilterSorted = _.sortBy(allTagsFromFilter, "tag");
    res.status(201).json(allTagsFromFilterSorted);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST new tag in DB
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  //TODO: CHeck tha user has admin rights

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
        `INSERT INTO public.tags (tag_name) VALUES ('${req.body.tag_name}');`
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

// POST edit tags
router.post("/edit/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  //TODO: CHeck tha user has admin rights

  try {
    const oldtag = req.body.oldtag;
    const newtag = req.body.newtag;

    // Rename in picture all from oldtag to newtag
    const selectPictureWithTagsQuery = `SELECT id, tags FROM pictures WHERE tags LIKE '%"${oldtag}"%'`;
    const pictureWithTag = await client.query(selectPictureWithTagsQuery);
    if (pictureWithTag.rows.length < 1) {
      res.status(400).json({
        error: `No picture found with the tag '${oldtag}'`,
      });
      return;
    } else {
      pictureWithTag.rows.forEach(async (row) => {
        const updatedTags = row.tags.replace(oldtag, newtag);
        const updateTagQuery = `UPDATE pictures SET tags='${updatedTags}' WHERE id=${row.id};`;
        await client.query(updateTagQuery);
      });
    }

    // Check if new Tag exist in the tag_table already
    const createTagQuery = `SELECT * FROM tags WHERE tag_name='${newtag}'`;
    const doesTagExist = await client.query(createTagQuery);

    if (doesTagExist.rows.length < 1) {
      // if no, Create new Tag in tag_table
      const createTagQuery = `INSERT INTO tags (tag_name) VALUES ('${newtag}');`;
      await client.query(createTagQuery);
    }

    // Delete the old tag form the tag_table
    const deleteTagQuery = `DELETE FROM tags WHERE tag_name='${oldtag}';`;
    await client.query(deleteTagQuery);

    res.status(201).json({
      message: `Tag '${oldtag}' was updated to '${newtag}'`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// DELETE  tags
router.delete("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  //TODO: CHeck tha user has admin rights

  try {
    const tagToDelete = req.body.tagToDelete;
    // Delete tagToDelete from tag
    const deleteTagQuery = `DELETE FROM tags WHERE tag_name='${tagToDelete}';`;
    console.log(deleteTagQuery);
    await client.query(deleteTagQuery);

    // Delete Tag in picture
    const selectPictureWithTagsQuery = `SELECT id, tags FROM pictures WHERE tags LIKE '%"${tagToDelete}"%'`;
    const pictureWithTag = await client.query(selectPictureWithTagsQuery);
    if (pictureWithTag.rows.length < 1) {
      res.status(400).json({
        error: `No picture found with the tag '${tagToDelete}'`,
      });
      return;
    } else {
      pictureWithTag.rows.forEach(async (row) => {
        const updatedTags = row.tags.replace(`"${tagToDelete}"`, null);
        const updateTagQuery = `UPDATE pictures SET tags='${updatedTags}' WHERE id=${row.id};`;
        await client.query(updateTagQuery);
      });
    }

    res.status(201).json({
      value: "success",
      message: `Tag '${tagToDelete}' was deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
