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
      throw new Error(`Error when deleting the picture in the database!`);
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

  async getPictureByName(name) {
    return await Picture.findOne({
      where: {
        original_name: name,
      },
    });
  },

  async getFavoritePictureById(ids) {
    const filterFormated = ids.map((id) => ({
      id: id,
    }));
    return await Picture.findAll({
      where: {
        [Op.or]: filterFormated,
      },
    });
  },

  async getPictureByKey(key) {
    return await Picture.findOne({
      where: {
        key: key,
      },
    });
  },

  async patchPictureById(id, tags) {
    const updatedPicture = await Picture.update(
      { tags: tags },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    // updatedLook[0]: number or row udpated
    // updatedLook[1]: rows updated
    return updatedPicture[1];
  },

  async patchPictureAdultContentById(id, isAdult) {
    const updatedPicture = await Picture.update(
      { adult_content: isAdult },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );
    // updatedLook[0]: number or row udpated
    // updatedLook[1]: rows updated
    return updatedPicture[1];
  },

  async getPicturesByTag(showMissing, tags, order) {
    const filterFormated = tags.map((element) => ({
      [Op.like]: `%${element}%`,
    }));
    return await Picture.findAll({
      attributes: ["id", "tags"],
      where: {
        tags_missing: showMissing,
        tags: {
          [Op.and]: filterFormated,
        },
      },
      order: [["id", order]],
    });
  },
};
