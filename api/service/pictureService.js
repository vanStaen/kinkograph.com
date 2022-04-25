const { Picture } = require("../../models/Picture");
const { Op } = require("sequelize");

exports.pictureService = {
  async addPicture(
    url_original,
    url_thumb,
    url_med,
    original_name,
    original_type,
    key
  ) {
    try {
      const picture = new Picture({
        url_original: url_original,
        url_thumb: url_thumb,
        url_med: url_med,
        original_name: original_name,
        original_type: original_type,
        key: key,
      });
      return await picture.save();
    } catch (err) {
      console.log(err);
      throw new Error(`Error when adding the picture to the database!`);
    }
  },

  async deletePicture(key) {
    try {
      await Picture.destroy({
        where: {
          key: key,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(`Error when deleting the picture to the database!`);
    }
  },

  async getPictures(showMissing, limit, offset, filter, order) {
    if (filter) {
      const filterFormated = filter.map((element) => ({
        [Op.like]: `%${element}%`,
      }));
      return await Picture.findAll({
        where: {
          tags_missing: showMissing,
          tags: {
            [Op.and]: filterFormated,
          },
        },
        limit: limit,
        offset: offset,
        order: [["id", order]],
      });
    } else {
      return await Picture.findAll({
        where: {
          tags_missing: showMissing,
        },
        limit: limit,
        offset: offset,
        order: [["id", order]],
      });
    }
  },

  async countPictures(showMissing, filter) {
    if (filter) {
      const filterFormated = filter.map((element) => ({
        [Op.like]: `%${element}%`,
      }));
      const { count } = await Picture.findAndCountAll({
        where: {
          tags_missing: showMissing,
          tags: {
            [Op.and]: filterFormated,
          },
        },
      });
      return count;
    } else {
      const { count } = await Picture.findAndCountAll({
        where: {
          tags_missing: showMissing,
        },
      });
      return count;
    }
  },
};
