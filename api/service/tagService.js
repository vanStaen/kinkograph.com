const { Tag } = require("../../models/Tag");

exports.tagService = {
  async getTags() {
    return foundUser = await Tag.findAll({
      order: [["id", "ASC"]],
    });
  }
};
