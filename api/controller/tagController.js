const router = require("express").Router();
const { pictureService } = require("../service/pictureService");
const { tagService } = require("../service/tagService");
const _ = require("lodash/core");

// GET all tags
router.get("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const tags = await tagService.getTags();
    res.status(201).json(tags);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET tags count
router.get("/count/", async (req, res) => {
    try {
    const tags = await tagService.getTagsCount();
    res.status(201).json(tags);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST return tags coresponding to a filter
router.post("/filter/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
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
  if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }
  try {
    const tagsExistAlready = await tagService.checkTagExist(req.body.tag);
    if (tagsExistAlready) {
      res.status(201).json({
        value: "failed",
        message: `the tag '${req.body.tag}' exist already!`,
      });
    } else {
      await tagService.addTag(req.body.tag);
      res.status(201).json({
        value: "success",
        message: `${req.body.tag} was added to the table 'tags'`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST edit tags
router.patch("/", async (req, res) => {
  if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }
    try {
      const oldtag = req.body.oldtag;
      const newtag = req.body.newtag;
      // Rename in picture all from oldtag to newtag
      const picturesWithTag = await pictureService.getPicturesByTag(false, [oldtag], "DESC");
      if (picturesWithTag.length < 1) {
        res.status(400).json({
          error: `No picture found with the tag '${oldtag}'`,
        });
        return;
      } else {
        picturesWithTag.forEach(async (picture) => {
          const updatedTags = picture.tags.replace(oldtag, newtag);
          await pictureService.patchPictureById(picture.id, updatedTags)
        });
      }
      // Check if new Tag exist in the tag_table already
      const doesTagExist = await tagService.checkTagExist(newtag)
      if (!doesTagExist) {
        // if no, Create new Tag in tag_table
        await tagService.addTag(newtag);
      }
      // Delete the old tag form the tag_table
      await tagService.deleteTag(oldtag);
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
  if (!req.isAdmin) {
    res.status(401).json({
      error: "You do not have administrator rights.",
    });
    return;
  }
    try {
      const tagToDelete = req.body.tagToDelete;
      await tagService.deleteTag(tagToDelete);
      // Delete Tag in picture
      const picturesWithTag = await pictureService.getPicturesByTag(false, [tagToDelete], "DESC");
      if (picturesWithTag.length < 1) {
        res.status(400).json({
          error: `No picture found with the tag '${tagToDelete}'`,
        });
        return;
      } else {
        picturesWithTag.forEach(async (picture) => {
          const updatedTags = picture.tags.replace(`"${tagToDelete}"`, null);
          await pictureService.patchPictureById(picture.id, updatedTags)
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
