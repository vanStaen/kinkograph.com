const { Tag } = require("../../models/Tag");

exports.tagService = {
  async getTags() {
    return await Tag.findAll({
      order: [["id", "ASC"]],
    });
  },

  async addTag(tag) {
    try {
      const newTag = new Tag({
        tag: tag,
      });
      return await newTag.save();
    } catch (err) {
      console.log(err);
      throw new Error(`Error when adding the tag to the database!`);
    }
  },

  async checkTagExist(tag) {
    const found = await Tag.findOne({
      where: {
        tag: tag,
      },
    });
    if (!found) {
      return false;
    }
    return true;
  },

  async deleteTag(tag) {
    try {
      await Tag.destroy({
        where: {
          tag: tag,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(`Error when deleting the tag in the database!`);
    }
  },

};
