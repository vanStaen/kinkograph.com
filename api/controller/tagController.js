const router = require("express").Router();
const { pictureService } = require("../service/pictureService");
const { tagService } = require("../service/tagService");
const _ = require("lodash/core");

// GET all tags
router.get("/", async (req, res) => {
  /*if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }*/
  try {
    const tags = await tagService.getTags();
    console.log(tags);
    res.status(201).json(tags);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST return tags coresponding to a filter
router.post("/filter/", async (req, res) => {
  /*if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }*/
  try {
    const arrayFilter = req.body.filter;
    const tagsFilter = await pictureService.getPicturesByTag(
      false,
      arrayFilter,
      "DESC"
    );
    const allTagsFromFilter = [];
    tagsFilter.forEach((row) => {
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
  /*if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }*/
  try {
    const tagsExistAlready = await tagService.checkTagExist(req.body.tag_name);
    if (tagsExistAlready) {
      res.status(201).json({
        value: "failed",
        message: `the tag '${req.body.tag_name}' exist already!`,
      });
    } else {
      await tagService.addTag(req.body.tag_name);
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
  /*if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }*/
  //Check that user has admin rights
  const user = await client.query(`SELECT * FROM users WHERE id=${req.userId}`);
  if (!user.rows[0].is_admin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  } else {
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
  }
});

// DELETE  tags
router.delete("/", async (req, res) => {
  /*if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }*/
  //Check that user has admin rights
  const user = await client.query(`SELECT * FROM users WHERE id=${req.userId}`);
  if (!user.rows[0].is_admin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  } else {
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
  }
});

module.exports = router;
